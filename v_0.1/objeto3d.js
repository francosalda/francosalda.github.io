class objeto3D
{
	constructor(nombreSuperficie,matrizModelado)
	{
		this.posicionObjeto = [0.0,0.0,0.0]; // posicion inicial del objeto
        //si se elige un tipo de superficie
        if(nombreSuperficie) 
        {   
            this.SuperficieCerrada = false; // true: posee tapa superior e inferior
            this.superficieDeUnaCara = false; // true: si posee la tapa inferior solamente
            this.claseDeSuperficie = "analitica"; //por defecto, pero puede ser: analitica,barrido,revolucion
            this.mallaDeTriangulos; // almacena la malla de triangulos del objeto 
            this.matrizTransformacion = mat4.clone(matrizModelado); // inicializa la matriz de modelado
            this.filas=50; // indica que hay 'filas+1' filas de vertices para la malla de triangulos por defecto
            this.columnas=50; // indica que hay 'columnas+1' columnas de vertices para la malla de triangulos por defecto
            this.Id = "none"; // tag identificador del objeto
            this.asignarTipoDeSuperficie(nombreSuperficie);// le asigna la funcion que calculara los vertices
            this.contenedor = false; // true: si es un objeto contenedor 
            this.curvaGeometrica; // curva de forma geometrica para objetos que son superficies de barrido
            console.log("[DEBUG]Se instancio un nuevo objeto 3D");
        }
        else
        {
            console.log("[DEBUG]Se instancio un nuevo objeto contenedor 3D");
            this.contenedor = true; 
            this.matrizTransformacion = new mat4.create();
        }

        this.cantHijos = 0; 
        this.hijos = [];
	}

    /*Getters y setters de la clase objeto3d*/
    obtenerPosicionObjeto()
    {
        return this.posicionObjeto;
    }
    establecerPosicionObjeto(posicion)
    {
        this.posicionObjeto = posicion;
    }
    asignarIdentificadorObjeto(identificador)
    {
        this.Id = identificador;
    }
    obtenerIdentificadorObjeto()
    {
        return this.Id;
    }
    AsignarCantidadFilas(cantFilas)
    {
        this.filas = cantFilas;
    }
    AsignarCantidadColumnas(cantColumnas)
    {
        this.columnas = cantColumnas;
    }


    esSuperficieCerrada()
    {
        return this.SuperficieCerrada;
    }
    asignarSuperficieCerrada()
    {
        this.SuperficieCerrada = true;
    }

    agregarHijo(objeto)
    {
    this.hijos.push(objeto);
    this.cantHijos++;
    }
    quitarUltimoHijo()
    {
        this.hijos.pop();
        this.cantHijos--;
    }
    obtenerUltimoHijo()
    {
        return this.hijos[(hijos.length)-1];
    }
    obtenerHijos(objeto)
    {
    return this.hijos;
    }


    asignarMatrizTransformacion(matriz)
    {
        
        this.matrizTransformacion =mat4.clone(matriz); ;
    }
    obtenerMatrizTransformacion()
    {
       return this.matrizTransformacion;
    }
    esUnContenedor()
    {
        return this.contenedor;
    }

    obtenerMallaDeTriangulos()
    {
        return this.mallaDeTriangulos;
    }
    asignarMallaDeTriangulos()
    {
        if(this.claseDeSuperficie == "analitica")
        {
           this.mallaDeTriangulos = this.generarSuperficie3dParametrica(this.superficie3D,this.filas,this.columnas);            
        }
        else if(this.claseDeSuperficie == "barrido")
        {
            this.mallaDeTriangulos = this.generarSuperficie3dParametrica(this.superficie3D,this.filas,this.columnas);               
        }
        else if (this.claseDeSuperficie == "revolucion")
        {

        }
        
    }

    /*asigna al objeto3d la funcion que generara los vertices */
    asignarTipoDeSuperficie(superficie)
    {
        if(superficie == "plano")
        {
            console.log("[Debug Objeto3d]: Se asigno el plano como superficie");
            this.superficie3D = new Plano(1,1);
            this.filas = 1; this.columnas = 1;
        }
        else if (superficie == 'esfera')
        {
            console.log("[Debug Objeto3d]: Se asigno la esfera como superficie");
            this.superficie3D = new Esfera(1);
            this.filas = 40; this.columnas = 40;
        }
        else if (superficie == 'cilindro')
        {
            this.superficie3D = new paredCilindro(1,1);//radio: 1 altura: 1
            this.asignarSuperficieCerrada();
            this.filas = 40; this.columnas = 40;
        }
        else if (superficie == 'cubo')
        {
            console.log("[Debug Objeto3d]: se asigno como superficie de barrido un cubo");
            let cantidadTramos = 4;
            let cantidadPuntosPorTramo = 2 ; // determina la cantidad de pasos por tramo 
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesCuadrado(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new paredCubo(1);
            this.claseDeSuperficie = "barrido";
            this.asignarSuperficieCerrada();
            this.filas = 1;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
             
        else if (superficie == "chasis")
        {
            let cantidadTramos =4;
            let cantidadPuntosPorTramo = 4;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesChasis(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new chasis(1);
            this.claseDeSuperficie = "barrido";
            this.asignarSuperficieCerrada();
            this.filas = 1;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        else if (superficie == "techo")
        {
         
        }
        else 
        {
            console.log("[DEBUG objeto3d]: Error al elejir el tipo de superficie");
        }
    }

    /*Se dibujan los triangulos del objeto*/
	 dibujarMalla(mallaDeTriangulos)
     {
        // Se configuran los buffers que alimentaron el pipeline
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mallaDeTriangulos.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.mallaDeTriangulos.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mallaDeTriangulos.webgl_uvs_buffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.mallaDeTriangulos.webgl_uvs_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mallaDeTriangulos.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.mallaDeTriangulos.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);
           
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mallaDeTriangulos.webgl_index_buffer);

        //modo de visualizacion de los triangulos
        if (modo!="wireframe")
        {
            gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));                    
            gl.drawElements(gl.TRIANGLE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
    
        if (modo!="smooth") 
        {
            gl.uniform1i(shaderProgram.useLightingUniform,false);
            gl.drawElements(gl.LINE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
 
    }

    /*Se realiza el llenado de los buffers con los vertices y su informacion*/
    llenarBuffers(filas,columnas,positionBuffer,normalBuffer,uvBuffer)
    {
    var indexBuffer = [];//Creo el Buffer de indices de los triángulos
    var indice = 0;
    var cantidad_columnas = columnas+1;
     for(let i=0 ; i< filas;i++)
    {
        for(let j=0; j < columnas;j++)
        {

            //si se trata del primer quad entonces necesito 4 vertices para representar la columna actual
           if(j == 0)
           {
                //si estoy comenzado una fila nueva,debo repetir vertices en el 1er quad para mecanismo de nueva fila de triangle_strip
                if(i > 0)
                {
                    indexBuffer[indice] = indexBuffer[indice-1];indice++;
                    indexBuffer[indice++] = cantidad_columnas*i +j;             
                }
                indexBuffer[indice++] = cantidad_columnas*i +j;   
                indexBuffer[indice++] = cantidad_columnas*(i+1) + j; 
                indexBuffer[indice++] = cantidad_columnas*(i)+(j+1);
                indexBuffer[indice++] = cantidad_columnas*(i+1)+(j+1); 
              
           }
           else
           {
           // si no es el primer quad, entonces solo debo agregar 2 vertices para  representar la columna actual   
                indexBuffer[indice++] = cantidad_columnas*(i)+(j+1);
                indexBuffer[indice++] = cantidad_columnas*(i+1)+(j+1);
            }

        }
        

    }
    
    //Inicialización de los buffers
    var webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positionBuffer), gl.STATIC_DRAW);
    webgl_position_buffer.itemSize = 3;
    webgl_position_buffer.numItems = this.positionBuffer.length / 3;

    var webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalBuffer), gl.STATIC_DRAW);
    webgl_normal_buffer.itemSize = 3;
    webgl_normal_buffer.numItems = this.normalBuffer.length / 3;

    var webgl_uvs_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uvBuffer), gl.STATIC_DRAW);
    webgl_uvs_buffer.itemSize = 2;
    webgl_uvs_buffer.numItems = this.uvBuffer.length / 2;


    var webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);
    webgl_index_buffer.itemSize = 1;
    webgl_index_buffer.numItems = indexBuffer.length;

    return {
        webgl_position_buffer,
        webgl_normal_buffer,
        webgl_uvs_buffer,
        webgl_index_buffer };

}

/*Genera los vertices de la superficie 3d*/
	generarSuperficie3dParametrica(superficie,filas,columnas)
    {
        this.positionBuffer = [];
        this.normalBuffer = [];
        this.uvBuffer = [];
        var contador = 0;
        let cantidad_columnas = columnas+1;

        if(this.claseDeSuperficie == "barrido")
        {
                //recorro los niveles
                for(let i = 0 ; i <=filas;i++)
                {
                    //recorro los tramos de la curva
                    for (let tramo=0; tramo < this.curvaGeometrica.obtenerCantidadTramos(); tramo++) 
                    {    
                        //recorro el tramo de la curva
                        for(var u = 0 ; u <= 1; u += 1/ (this.curvaGeometrica.obtenerCantidadPuntosPorTramo()-1))
                        {

                            var pos=superficie.getPosicion(u,i,this.curvaGeometrica,tramo);  
                            this.positionBuffer.push(pos[0]);
                            this.positionBuffer.push(pos[1]);
                            this.positionBuffer.push(pos[2]);

                            var nrm=superficie.getNormal(u,v);
                            this.normalBuffer.push(nrm[0]);
                            this.normalBuffer.push(nrm[1]);
                            this.normalBuffer.push(nrm[2]);

                            var uvs=superficie.getCoordenadasTextura(u,v);
                            this.uvBuffer.push(uvs[0]);
                            this.uvBuffer.push(uvs[1]);
                            contador++;                              
                        }
                 
                    }
                }
        }
        else if(this.claseDeSuperficie == "analitica")
        {
            for (var i=0; i <= filas; i++) 
            {
                for (var j=0; j <= columnas; j ++) 
                {
                    var u=j/columnas;
                    var v=i/filas;

                    var pos=superficie.getPosicion(u,v);
                    this.positionBuffer.push(pos[0]);
                    this.positionBuffer.push(pos[1]);
                    this.positionBuffer.push(pos[2]);

                    var nrm=superficie.getNormal(u,v);
                    this.normalBuffer.push(nrm[0]);
                    this.normalBuffer.push(nrm[1]);
                    this.normalBuffer.push(nrm[2]);

                    var uvs=superficie.getCoordenadasTextura(u,v);
                    this.uvBuffer.push(uvs[0]);
                    this.uvBuffer.push(uvs[1]);
                    contador++;

                }        
            }
        }

     // se agrega la tapa superior e inferior si es una superficie cerrada
        if(this.esSuperficieCerrada()) 
        {
            let cantidadCoordenadasPorVertice = 3;
            let posVerticeInf = this.calcularPuntoCentral(this.positionBuffer.slice(0,cantidad_columnas*cantidadCoordenadasPorVertice));
            let postVerticeSup = this.calcularPuntoCentral(this.positionBuffer.slice(-1*cantidad_columnas*cantidadCoordenadasPorVertice));
    
    
            for(let i = 0 ; i < cantidad_columnas; i++)
                {
                    this.positionBuffer.unshift(posVerticeInf[0]);this.positionBuffer.push(postVerticeSup[0]);
                    this.positionBuffer.unshift(posVerticeInf[1]);this.positionBuffer.push(postVerticeSup[1]);
                    this.positionBuffer.unshift(posVerticeInf[2]);this.positionBuffer.push(postVerticeSup[2]);
                    nrm = [0.0,-1.0,0.0];
                    this.normalBuffer.unshift(nrm[0]);this.normalBuffer.push(-1*nrm[0]);
                    this.normalBuffer.unshift(nrm[1]);this.normalBuffer.push(-1*nrm[1]);
                    this.normalBuffer.unshift(nrm[2]);this.normalBuffer.push(-1*nrm[2]);
                     uvs = [0.0,0.0];
                    this.uvBuffer.unshift(uvs[0]); this.uvBuffer.push(uvs[0]);
                    this.uvBuffer.unshift(uvs[1]);this.uvBuffer.push(uvs[1]);
                }
            filas = filas + 2; // se agregaron 2 tapas
        }
        else if(this.superficieDeUnaCara)
        {
            let cantidadCoordenadasPorVertice = 3;
            let posVerticeCentral = this.calcularPuntoCentral(this.positionBuffer.slice(0,cantidad_columnas*cantidadCoordenadasPorVertice));
            for(let i = 0 ; i < cantidad_columnas; i++)
                {
                    this.positionBuffer.unshift(posVerticeCentral[0]);
                    this.positionBuffer.unshift(posVerticeCentral[1]);
                    this.positionBuffer.unshift(posVerticeCentral[2]);
                    nrm = [0.0,1.0,0.0];
                    this.normalBuffer.unshift(nrm[0]);
                    this.normalBuffer.unshift(nrm[1]);
                    this.normalBuffer.unshift(nrm[2]);
                    uvs = [0.0,0.0];
                    this.uvBuffer.unshift(uvs[0]); 
                    this.uvBuffer.unshift(uvs[1]);

                }
            filas = filas + 1; // se agregaron 1 tapa
       }
    return this.llenarBuffers(filas,columnas,this.positionBuffer,this.normalBuffer,this.uvBuffer);
}

/*Calcula el punto central del poligono descripto por un conjunto de
 vertices en formato x,y,z  */
    calcularPuntoCentral(vertices)
    {
        let cantidadCoordenadasPorVertice = 3; // (x,y,z)
        let cantidadVertices = vertices.length/cantidadCoordenadasPorVertice; 
        let x =0 ,y = 0, z = 0; 
        //calcula el promedio de cada coordenada 
        for(let i = 0; i < (cantidadVertices);i++)
        {   
            x += vertices[3*i];
            y += vertices[3*i+1];
            z += vertices[3*i+2];
        }
        return [x/cantidadVertices,y/cantidadVertices,z/cantidadVertices];
    }
    
}   //fin de la clase objeto3D

