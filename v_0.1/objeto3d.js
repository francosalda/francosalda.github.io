class objeto3D
{
	constructor(nombreSuperficie,matrizModelado)
	{
        if(matrizModelado)
        {
            this.matrizTransformacion = mat4.clone(matrizModelado);
        }else{
            this.matrizTransformacion = mat4.create(); 
        }
		this.posicionObjeto = [0.0,0.0,0.0]; // posicion inicial del objeto
        //si se elige un tipo de superficie
        if(nombreSuperficie) 
        {   
            this.SuperficieCerrada = false; // true: posee tapa superior e inferior
            this.superficieDeUnaCara = false; // true: si posee la tapa inferior solamente
            this.claseDeSuperficie = "analitica"; //por defecto, pero puede ser: analitica,barrido,revolucion
            this.mallaDeTriangulos; // almacena la malla de triangulos del objeto 
            this.filas=50; // indica que hay 'filas+1' filas de vertices para la malla de triangulos por defecto
            this.columnas=50; // indica que hay 'columnas+1' columnas de vertices para la malla de triangulos por defecto
            this.Id = "none"; // tag identificador del objeto
            
            this.asignarTipoDeSuperficie(nombreSuperficie);// le asigna la función que calculara los vertices
            this.contenedor = false; // true: si es un objeto contenedor 
            this.curvaGeometrica; // curva de forma geometrica para objetos que son superficies de barrido
            this.textura = null;
            this.colorObjeto = [0.9,0.1,0.1];
            this.reflectionCubeMap = false;
            
            
        }
        else
        {
            this.contenedor = true; 
            this.matrizTransformacion = new mat4.create();
        }

        this.cantHijos = 0; 
        this.hijos = new Array();
	}
    setReflectionCubeMapState(estado)
    {
        this.reflectionCubeMap = estado;
    }
    getReflectionCubeMapState()
    {

        return this.reflectionCubeMap;
    }

    setTexture(texture)
    {
        this.textura =texture; 
    }
    getTexture()
    {
        return this.textura;
    }
   
    setColor(color)
    {
        this.colorObjeto = color;
    }
    getColor()
    {
        return this.colorObjeto;
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
    (this.hijos).push(objeto);
    this.cantHijos++;
    }
    quitarUltimoHijo()
    {    
    (this.hijos).pop();
    this.cantHijos--;   
    }
    obtenerUltimoHijo()
    {
        return this.hijos[(this.hijos.length)-1];
    }
    obtenerHijos(objeto)
    {
    return this.hijos;
    }
    asignarMatrizTransformacion(matriz)
    {
        
        this.matrizTransformacion =mat4.clone(matriz) ;
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
        this.mallaDeTriangulos = this.generarSuperficie3dParametrica(this.superficie3D,this.filas,this.columnas);                  
    }

    /*asigna al objeto3d la funcion que generara los vertices */
    asignarTipoDeSuperficie(superficie)
    {
        if(superficie == "plano")
        {
            this.superficie3D = new Plano(8,8);
            this.filas = 1; this.columnas = 1;
        }
        else if (superficie == 'esfera')
        {
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
            let cantidadTramos = 4;
            let cantidadPuntosPorTramo = 2 ; // determina la cantidad de pasos por tramo 
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesCuadrado(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieBarrido(1,1,1);
            this.claseDeSuperficie = "barrido";
            this.curvaTrayectoria = new recorridoLinealEjeY();
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
            this.superficie3D = new superficieBarrido(1,1,1);
            this.claseDeSuperficie = "barrido";
            this.curvaTrayectoria = new recorridoLinealEjeY();
            this.asignarSuperficieCerrada();
            this.filas = 1;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        else if (superficie == "asiento")
        { 
            let cantidadTramos =4;
            let cantidadPuntosPorTramo = 4;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesAsiento(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieBarrido(1,1,1);
            this.claseDeSuperficie = "barrido";
            this.curvaTrayectoria = new recorridoLinealEjeY();
            this.asignarSuperficieCerrada();
            this.filas = 1;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        else if (superficie == "techo")
        {
            let cantidadTramos =1;
            let cantidadPuntosPorTramo =9;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesTecho(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieBarrido(1,1/(12),1/(7*2));
            this.claseDeSuperficie = "barrido";
            this.curvaTrayectoria = new recorridoLinealEjeY();
            this.asignarSuperficieCerrada();
            this.filas = 1;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        

         else if (superficie == "rueda")
        {
            let cantidadTramos =7;
            let cantidadPuntosPorTramo = 16;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesRueda(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieRevolucion(1,1,1,1); //radio
            this.claseDeSuperficie = "revolucion";
            this.curvaTrayectoria = new recorridoCircular();
            this.filas = 360;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
         else if (superficie == "baseImpresora")
        {
            let cantidadTramos =6;
            let cantidadPuntosPorTramo = 16;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesBaseImpresora(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieRevolucion(1,4,1,1); //radio
            this.claseDeSuperficie = "revolucion";
            this.curvaTrayectoria = new recorridoCircular();
            this.filas = 360;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        else if (superficie == "A1")
        {
            let cantidadTramos =7;
            let cantidadPuntosPorTramo = 16;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesA1(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieRevolucion(1,0.4,3,3); //radio
            this.claseDeSuperficie = "revolucion";
            this.curvaTrayectoria = new recorridoCircular();
            this.filas = 360;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        else if (superficie == "A2")
        {
            let cantidadTramos =3;
            let cantidadPuntosPorTramo = 16;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesA2(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieRevolucion(1,0.4,2,2); //radio , altura
            this.claseDeSuperficie = "revolucion";
            this.curvaTrayectoria = new recorridoCircular();
            this.filas = 360;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        else if (superficie == "A3")
        {
            let cantidadTramos =6;
            let cantidadPuntosPorTramo = 16;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesA3(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieRevolucion(1,0.4,3,3); //radio
            this.claseDeSuperficie = "revolucion";
            this.curvaTrayectoria = new recorridoCircular();
            this.filas = 360;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        else if (superficie == "A4")
        {
            let cantidadTramos =5;
            let cantidadPuntosPorTramo = 16;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesA4(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieRevolucion(1,0.4,3,3); //radio
            this.claseDeSuperficie = "revolucion";
            this.curvaTrayectoria = new recorridoCircular();
            this.filas = 360;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
         else if (superficie == "B1")
        {
            let cantidadTramos =3;
            let cantidadPuntosPorTramo = 18;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesB1(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieBarrido(1,1,4);
            this.claseDeSuperficie = "barrido";
            this.curvaTrayectoria = new recorridoLinealEjeY();
            this.filas = 10;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        else if (superficie == "B2")
        {
            let cantidadTramos =7;
            let cantidadPuntosPorTramo = 9;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesB2(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieBarrido(1,1,4);
            this.claseDeSuperficie = "barrido";
            this.curvaTrayectoria = new recorridoLinealEjeY();
            this.filas = 10;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
         else if (superficie == "B3")
        {
            let cantidadTramos =16;
            let cantidadPuntosPorTramo = 9;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesB3(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieBarrido(1,1,4);
            this.claseDeSuperficie = "barrido";
            this.curvaTrayectoria = new recorridoLinealEjeY();
            this.filas = 10;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
        }
        else if (superficie == "B4")
        {
            let cantidadTramos =4;
            let cantidadPuntosPorTramo = 18;
            let gradoCurva = 3;
            this.curvaGeometrica =new CurvaBezier(gradoCurva,verticesB4(),cantidadTramos,cantidadPuntosPorTramo);
            this.superficie3D = new superficieBarrido(1,4,4);
            this.claseDeSuperficie = "barrido";
            this.curvaTrayectoria = new recorridoLinealEjeY();
            this.filas = 10;
            this.columnas = this.curvaGeometrica.obtenerCantidadTramos()*cantidadPuntosPorTramo - 1;
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

        if(this.claseDeSuperficie == "analitica")
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
        else 
        {
        //recorro los niveles
            for(let i = 0 ; i <=filas;i++)
            {
            //Calculo la matriz del nivel
            let matrizNivelTranspuesta = mat4.create();
            if(this.claseDeSuperficie == "revolucion")
            {
                    let puntoTrayectoria = this.curvaTrayectoria.getPosicion(i);
                    let tangenteTrayectoria = this.curvaTrayectoria.getTangente(i);
                    let binormalTrayectoria = this.curvaTrayectoria.getBiNormal(i);
                    let normalTrayectoria = this.curvaTrayectoria.getNormal(binormalTrayectoria,tangenteTrayectoria,i);
                    let matrizNivel = mat4.fromValues(normalTrayectoria[0],binormalTrayectoria[0], tangenteTrayectoria[0],puntoTrayectoria[0],
                    normalTrayectoria[1], binormalTrayectoria[1], tangenteTrayectoria[1], puntoTrayectoria[1],
                    normalTrayectoria[2], binormalTrayectoria[2], tangenteTrayectoria[2], puntoTrayectoria[2],
                    0, 0, 0, 1);
                    mat4.transpose(matrizNivelTranspuesta,matrizNivel);
            }
            else if (this.claseDeSuperficie == "barrido")
            {

                    let puntoTrayectoria = this.curvaTrayectoria.getPosicion(i/filas);
                    let tangenteTrayectoria = this.curvaTrayectoria.getTangente(i/filas);
                    let normalTrayectoria = this.curvaTrayectoria.getNormal(i/filas);
                    let binormalTrayectoria = this.curvaTrayectoria.getBiNormal(normalTrayectoria,tangenteTrayectoria,i/filas);   
                    let matrizNivel = mat4.fromValues(normalTrayectoria[0],binormalTrayectoria[0], tangenteTrayectoria[0],puntoTrayectoria[0],
                    normalTrayectoria[2], binormalTrayectoria[2], tangenteTrayectoria[2], puntoTrayectoria[1],
                    normalTrayectoria[1], binormalTrayectoria[1], tangenteTrayectoria[1], puntoTrayectoria[2],
                    0, 0, 0, 1); 
                    if(imprimiendo)
                    {
                        mat4.rotate(matrizNivel, matrizNivel, (anguloTorsionGUI*Math.PI/180)*i/filas, [0.0,1.0,0.0]);    

                    }
                    
                    mat4.transpose(matrizNivelTranspuesta,matrizNivel);            
            }
            //recorro los tramos dela curva

            for (let tramo=0; tramo < this.curvaGeometrica.obtenerCantidadTramos(); tramo++) 
            {    
                
                //recorro un tramo de la curva
                for(var u = 0 ; u <= 1; u += 1/ (this.curvaGeometrica.obtenerCantidadPuntosPorTramo()-1))
                {
                     
                    let pos =superficie.getPosicion(u,this.curvaGeometrica,tramo);
                    vec4.transformMat4(pos, pos, matrizNivelTranspuesta);                    
                    this.positionBuffer.push(pos[0]);
                    this.positionBuffer.push(pos[1]);
                    this.positionBuffer.push(pos[2]);

                    var nrm=superficie.getNormal(u,i/filas,this.curvaGeometrica,this.curvaTrayectoria,tramo);
                    this.normalBuffer.push(nrm[0]);
                    this.normalBuffer.push(nrm[1]);
                    this.normalBuffer.push(nrm[2]);
                    
                    if(this.claseDeSuperficie == "revolucion")
                    {

                     var uvs=superficie.getCoordenadasTextura(u,i,tramo,this.curvaGeometrica);
                    }else{
                        var uvs=superficie.getCoordenadasTextura(u,i,tramo,this.curvaGeometrica);
                    }
                 
                    
                    this.uvBuffer.push(uvs[0]);
                    this.uvBuffer.push(uvs[1]);
                }
         
            }
            
        }   
    }

     // se agrega la tapa superior e inferior si es una superficie cerrada
        if(this.esSuperficieCerrada()) 
        {
         
            let cantidadCoordenadasPorVertice = 3;
            let verticesTapaInferior = this.positionBuffer.slice(0,cantidad_columnas*cantidadCoordenadasPorVertice);
            let verticesTapaSuperior = this.positionBuffer.slice(-1*cantidad_columnas*cantidadCoordenadasPorVertice);
            let posVerticeInf = this.calcularPuntoCentral(verticesTapaInferior); 
            let postVerticeSup = this.calcularPuntoCentral(verticesTapaSuperior);
        
           
            //duplico los vertices de la tapa superior
            for(let i = 0 ; i < cantidad_columnas; i++)
            {
                this.positionBuffer.push(verticesTapaSuperior[0+i*3]);
                this.positionBuffer.push(verticesTapaSuperior[1+i*3]);
                this.positionBuffer.push(verticesTapaSuperior[2+i*3]);
                 nrm = [0.0,1.0,0.0];
                this.normalBuffer.push(nrm[0]);
                this.normalBuffer.push(nrm[1]);
                this.normalBuffer.push(nrm[2]);
                let coordMinimas = this.buscarMinimos(verticesTapaSuperior);
                let coordMaximas = this.buscarMaximos(verticesTapaSuperior);
                 let ux = (verticesTapaSuperior[0+i*3] - coordMinimas[0]) /(coordMaximas[0]-coordMinimas[0]);
                let uz = (verticesTapaSuperior[2+i*3] - coordMinimas[2]) /(coordMaximas[2]-coordMinimas[2]);

                this.uvBuffer.push(ux); 
                this.uvBuffer.push(uz);
            }
   
            //Vertice central de colapso superior
            for(let i = 0 ; i < cantidad_columnas; i++)
                {
                    this.positionBuffer.push(postVerticeSup[0]);
                    this.positionBuffer.push(postVerticeSup[1]);
                    this.positionBuffer.push(postVerticeSup[2]);
                    nrm = [0.0,1.0,0.0];
                    this.normalBuffer.push(nrm[0]);
                    this.normalBuffer.push(nrm[1]);
                    this.normalBuffer.push(nrm[2]);
                    this.uvBuffer.push(0.5);
                    this.uvBuffer.push(0.5); 
                }
                //Vertice central de colapso inferior
                for(let i = 0 ; i < cantidad_columnas; i++)
                {
                    this.positionBuffer.unshift(posVerticeInf[2]);
                    this.positionBuffer.unshift(posVerticeInf[1]);
                    this.positionBuffer.unshift(posVerticeInf[0]);
                    nrm = [0.0,1.0,0.0];
                    this.normalBuffer.unshift(-1*nrm[2]);
                    this.normalBuffer.unshift(-1*nrm[1]);
                    this.normalBuffer.unshift(-1*nrm[0]);
                    this.uvBuffer.unshift(0.5);
                    this.uvBuffer.unshift(0.5);
                }
            //duplico los vertices de la tapa inferior
            for(let i = 0 ; i < cantidad_columnas; i++)
            {
                this.positionBuffer.unshift(verticesTapaInferior[2+i*3]);
                this.positionBuffer.unshift(verticesTapaInferior[1+i*3]);
                this.positionBuffer.unshift(verticesTapaInferior[0+i*3]);
                nrm = [0.0,-1.0,0.0];
                this.normalBuffer.unshift(nrm[2]);
                this.normalBuffer.unshift(nrm[1]);
                this.normalBuffer.unshift(nrm[0]);
                let coordMinimas = this.buscarMinimos(verticesTapaInferior);
                let coordMaximas = this.buscarMaximos(verticesTapaInferior);
                let ux = (verticesTapaInferior[0+i*3] - coordMinimas[0]) /(coordMaximas[0]-coordMinimas[0]);
                let uz = (verticesTapaInferior[2+i*3] - coordMinimas[2]) /(coordMaximas[2]-coordMinimas[2]);
                this.uvBuffer.unshift(uz); 
                this.uvBuffer.unshift(ux);
            }

            filas = filas + 4; // se agregaron 2 tapas + 2 filas de punto de colapso
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
/*retorna el xMin Ymin Zmin de un conjuntos de vertices*/
    buscarMinimos(vertices)
    {
        let cantidadCoordenadasPorVertice = 3; // (x,y,z)
        let cantidadVertices = vertices.length/cantidadCoordenadasPorVertice;
        let xMin =vertices[0] ,yMin = vertices[1], zMin = vertices[2]; 

        for(let i = 0; i < (cantidadVertices);i++)
        {   
            let xVertice = vertices[3*i];
            let yVertice = vertices[3*i+1];
            let zVertice = vertices[3*i+2];
            if(xVertice<xMin) {xMin = xVertice};
            if(yVertice<yMin) {yMin = yVertice};
            if(zVertice<zMin) {zMin = zVertice};
         
        }
        return [xMin,yMin,zMin];
    }    
    /*retorna el xMax YMax zMax de un conjuntos de vertices*/
    buscarMaximos(vertices)
    {
        let cantidadCoordenadasPorVertice = 3; // (x,y,z)
        let cantidadVertices = vertices.length/cantidadCoordenadasPorVertice;
        let xMax =vertices[0] ,yMax = vertices[1], zMax = vertices[2]; 

        for(let i = 0; i < (cantidadVertices);i++)
        {   
            let xVertice = vertices[3*i];
            let yVertice = vertices[3*i+1];
            let zVertice = vertices[3*i+2];
            if(xVertice>xMax) {xMax = xVertice};
            if(yVertice>yMax) {yMax = yVertice};
            if(zVertice>zMax) {zMax = zVertice};
         
        }
        return [xMax,yMax,zMax];
    }    



}   //fin de la clase objeto3D



