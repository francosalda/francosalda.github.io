/*realiza el dibujado de la malla de triangulos de los objetos*/
function dibujarObjetos(objetosEscena)
{
	//para cada objeto de la escena
	for(let i=0; i < objetosEscena.length; i++)
	{
		//si es un objeto contenedor dibujo sus hijos
		if(objetosEscena[i].esUnContenedor())
		{
			dibujarObjetos(objetosEscena[i].obtenerHijos());	
		}
		else
		{
			//dibujado del objeto
			aux = objetosEscena[i].obtenerMatrizTransformacion();
	        objetosEscena[i].asignarMatrizTransformacion(aux);
	        matrizModelado = aux;
	        setMatrixUniforms();
	        if(lighting)
	        {
	        	gl.bindTexture(gl.TEXTURE_2D, objetosEscena[i].getTexture());
	        }
	        else
	        {
	        	//color del objeto
	        	let colorObjeto = objetosEscena[i].getColor();
	       		 gl.uniform3f(shaderProgram.uFixedColorObject,colorObjeto[0],colorObjeto[1],colorObjeto[2]);

	        }
	        objetosEscena[i].dibujarMalla(objetosEscena[i].obtenerMallaDeTriangulos());
    	}
	}

}


/*le asigna la malla de triangulo a los objetos de la escena*/
function asignarMallasObjetos(objetosEscena)
{
	for(let i=0; i < objetosEscena.length; i++)
	{
		//si es un contenedor, recorro los hijos
		if(objetosEscena[i].esUnContenedor())
		{
			asignarMallasObjetos(objetosEscena[i].obtenerHijos());
		}
		else
		{
			//si no es un contenedor le asigno la malla correspondiente
			objetosEscena[i].asignarMallaDeTriangulos();
		}
		
	}

}


/*Carga las texturas*/
function loadTexture(nombreTextura,scrTextura)
{
	console.log("[Debug] Cargando Textura:",nombreTextura);
	mapaTexturas.set(nombreTextura,cantTexturas);
	let textura = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textura);
     //Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));
    // Asynchronously load an image
    var imagenTextura = new Image();
    imagenTextura.src = scrTextura;
    imagenTextura.addEventListener('load', function() {
    // Now that the image has loaded make copy it to the texture.
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, imagenTextura);
    //gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
    });
    imagesTextures.push(imagenTextura);
    textures.push(textura);
    cantTexturas++;

}