

class objeto3D
{
	constructor(tipoSuperficie,matrizModelado)
	{
		
        if(tipoSuperficie)
        {
            this.mallaDeTriangulos;
            if(!matrizModelado)
            {
                this.matrizTransformacion = new mat4.create();
            }
            else
            {
                this.matrizTransformacion = new mat4.create();
                this.matrizTransformacion = mat4.clone(matrizModelado);    
            }
            
            this.filas=40; // indica que hay 'filas+1' filas de vertices
            this.columnas=40; // indica que hay 'columnas+1' columnas de vertices
            this.asignarTipoDeSuperficie(tipoSuperficie);
            this.contenedor = false;
            console.log("[DEBUG]Se instancio un nuevo objeto 3D");

        }
        else
        {
            console.log("[DEBUG]Se instancio un nuevo objeto contenedor 3D");
            this.contenedor = true;
        }

        this.cantHijos = 0;
        this.hijos = [];
	}

    agregarHijo(objeto)
    {
    this.hijos.push(objeto);
    this.cantHijos++;
    }
    obtenerHijos(objeto)
    {
    return this.hijos;
    }


    asignarMatrizTransformacion(matriz)
    {
        this.matrizTransformacion = mat4.clone(matriz);
    }
    obtenerMatrizTransformacion()
    {
       return this.matrizTransformacion;
    }
    esUnContenedor()
    {
        return this.contenedor;
    }

	 dibujarMalla(mallaDeTriangulos){
    
    // Se configuran los buffers que alimentaron el pipeline
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mallaDeTriangulos.webgl_position_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.mallaDeTriangulos.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.mallaDeTriangulos.webgl_uvs_buffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.mallaDeTriangulos.webgl_uvs_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.mallaDeTriangulos.webgl_normal_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.mallaDeTriangulos.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);
       
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mallaDeTriangulos.webgl_index_buffer);


    if (modo!="wireframe"){
        gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));                    
        /*
            Aqui es necesario modificar la primitiva por triangle_strip
        */
          gl.drawElements(gl.TRIANGLE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
      //  gl.drawElements(gl.TRIANGLES, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    
    if (modo!="smooth") {
        gl.uniform1i(shaderProgram.useLightingUniform,false);
        gl.drawElements(gl.LINE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
 
}







	obtenerMallaDeTriangulos()
	{
		return this.mallaDeTriangulos;
	}
	asignarMallaDeTriangulos()
	{
		this.mallaDeTriangulos = this.generarSuperficie3d(this.superficie3D,this.filas,this.columnas);
	}
	asignarTipoDeSuperficie(superficie)
	{
	
		if(superficie == "plano")
		{
			console.log("[Debug Objeto3d]: Se asigno el plano como superficie");
			this.superficie3D = new PlanoPrueba(1,1);
		}
		else if (superficie == 'esfera')
		{
			console.log("[Debug Objeto3d]: Se asigno el plano como superficie");
			this.superficie3D = new Esfera(1);
		}
		else 
		{
			console.log("[DEBUG objeto3d]: Error al elejir el tipo de superficie");
		}
    
	}

	generarSuperficie3d(superficie,filas,columnas)
	{
		this.positionBuffer = [];
	    this.normalBuffer = [];
	    this.uvBuffer = [];
	    var contador = 0;

	    for (var i=0; i <= filas; i++) {
	        for (var j=0; j <= columnas; j++) {


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
	//Creo el Buffer de indices de los triángulos
    var indexBuffer = [];
    var indice = 0;
    var cantidad_columnas = columnas+1;
    for(i=0 ; i< filas;i++)
    {
        for(j=0; j < columnas;j++)
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

            //[DEBUG]
            console.log('IndexBuffer para TRIANGLE_STRIP:')
            console.log(indexBuffer);


    // Creación e Inicialización de los buffers

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
        webgl_index_buffer
    }
}

}
function Esfera(radio)
{
    this.getPosicion=function(u,v)
    {
        u = u *2*Math.PI;
        v = v *Math.PI;

        var x = radio*((Math.cos(u))*(Math.sin(v)));
        var y = radio*((Math.sin(u))*(Math.sin(v)));
        var z = radio*(Math.cos(v));

        //Parametrización alternativa en des-uso
        //var x = radio*((Math.cos(u))*(Math.cos(v)));
        //var y = radio*((Math.sin(u))*(Math.cos(v)));
        //var z = radio*(Math.sin(v));
        return [x,y,z];
    }
    this.getNormal=function(u,v){
 
        u = u * 2*Math.PI;
        v = v * 2*Math.PI;
        //calculo del vector normal a la superficie
        var nx = Math.pow(radio,2)*Math.cos(v)*Math.cos(u)*Math.cos(v);
        var ny = Math.pow(radio,2)*Math.cos(v)*Math.sin(u)*Math.cos(v);
        var nz = Math.pow(radio,2)*Math.cos(v)*Math.sin(v);
        var norma = Math.sqrt(Math.pow(nx,2)+Math.pow(ny, 2)+Math.pow(nz,2));

        return [nx/norma,ny/norma,nz/norma];
    }

    this.getCoordenadasTextura=function(u,v){
        
        return [u,v];
        
    }

}

function PlanoPrueba(ancho,largo){

    
    this.getPosicion=function(u,v){

    

        var x=(u-0.5)*ancho;
        var z=(v-0.5)*largo;
        return [x,0,z];
    }

    this.getNormal=function(u,v){
        return [0,1,0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}
