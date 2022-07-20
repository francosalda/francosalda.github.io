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
	        setMatrixUniforms(aux);
	        if(lighting)
	        {
	        	gl.activeTexture(gl.TEXTURE0);
	        	gl.bindTexture(gl.TEXTURE_2D, objetosEscena[i].getTexture());
	        	if(objetosEscena[i].getReflectionCubeMapState())
	        	{
	        		gl.uniform1i(shaderProgram.UseReflectionCubeMapUniform,true);
	        	}
	        	else {gl.uniform1i(shaderProgram.UseReflectionCubeMapUniform,false);}
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
	mapaTexturas.set(nombreTextura,cantTexturas);
	gl.activeTexture(gl.TEXTURE0);
	let textura = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textura);
     //Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));
    // Asynchronously load an image
    var imagenTextura = new Image();
    imagenTextura.src = scrTextura;
    imagenTextura.addEventListener('load', function() {
    // Now that the image has loaded make copy it to the texture.
    gl.activeTexture(gl.TEXTURE0);
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
function loadCubeMap()
{
    // Create a texture.
cubeMapTexture = gl.createTexture();
gl.activeTexture(gl.TEXTURE0+1);
gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMapTexture);
 
const faceInfos = [
  {
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, 
    url: 'maps/greyRoom1_right.jpg',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
    url: 'maps/greyRoom1_left.jpg',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 
    url: 'maps/greyRoom1_top.jpg',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
    url: 'maps/greyRoom1_bottom.jpg',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 
    url: 'maps/greyRoom1_back.jpg',
  },
  {
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 
    url: 'maps/greyRoom1_front.jpg',
  },
];
faceInfos.forEach((faceInfo) => {
  const {target, url} = faceInfo;
 
  // Upload the canvas to the cubemap face.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 512;
  const height = 512;
  const format = gl.RGBA;
  const type = gl.UNSIGNED_BYTE;
 
  // setup each face so it's immediately renderable
  gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
 
  // Asynchronously load an image
  const image = new Image();
  image.src = url;
  image.addEventListener('load', function() {
    // Now that the image has loaded upload it to the cubeMapTexture.
    gl.activeTexture(gl.TEXTURE0+1);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMapTexture);
    gl.texImage2D(target, level, internalFormat, format, type, image);
   // gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
  });
});
//gl.generateMipmap(gl.TEXTURE_CUBE_MAP);

gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
}