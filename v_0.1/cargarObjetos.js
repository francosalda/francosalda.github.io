
/*carga el conjunto de objetos de la escena en el array 'objetos' */
function cargarObjetosEscena(objetos)
{
	console.log("[DEBUG] Cargando objetos de la escena");
	cargarAutoElevador(objetos);
	cargarEstanteria(objetos);
	cargarGalpon(objetos);
	cargarImpresora(objetos);
	cargarObjetosPrueba(objetos);


	asignarMallasObjetos(objetos);
}

function handleTextureLoaded(image, texture) {
 
}
/*carga las formas que conforman la estanteria*/
function cargarEstanteria(objetos)
{
	console.log("[DEBUG] Cargando objetos de la estanteria");
	estanteria = new objeto3D; // contenedor
	estanteInferior = GenerarCubo();
	patasDelanterasEstanteria = new objeto3D; //contenedor
	patasTraserasEstanteria = new objeto3D;//contenedor
	estanteInferior = GenerarCubo();
	estanteMedio = GenerarCubo();
	estanteSuperior = GenerarCubo();
	//patas de la estanteria
	let altoPatas = 1.55,largoPatas=0.03,anchoPatas=0.03;
	let separacionEntrePatas = 0.4; //distancia entra patas consecutivas delanteras o traseras
	let distanciaEntrePatas = 0.25; //distancia entre patas traseras y delanteras

	/*texturas*/
	var texturePataEstanteria = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texturePataEstanteria);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0.45,0.1,0.0,0.5]));
	// Asynchronously load an image
	var image = new Image();
	image.src = "maps/Wood06_1K_BaseColor.png";
	image.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, texturePataEstanteria);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});

	var textureEstante = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureEstante);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0.0,1.5,0.0,1.0]));
	// Asynchronously load an image
	var image2 = new Image();
	image2.src = "maps/ScratchedPaintedMetal01_1K_BaseColor.png";
	image2.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, textureEstante);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image2);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});


	for(let i = 0 ; i < 9 ; i++)
	{
		let pataDelantera = GenerarCubo();
		let pataTrasera = GenerarCubo();
		escalarObjeto(pataDelantera,[largoPatas,altoPatas,anchoPatas]);
		escalarObjeto(pataTrasera,[largoPatas,altoPatas,anchoPatas]);
		trasladarObjeto(pataDelantera,[-distanciaEntrePatas/2,altoPatas/2,-1.5+i*separacionEntrePatas]);
		trasladarObjeto(pataTrasera,[distanciaEntrePatas/2,altoPatas/2,-1.5+i*separacionEntrePatas]);
		patasDelanterasEstanteria.agregarHijo(pataDelantera);
		patasTraserasEstanteria.agregarHijo(pataTrasera)
		pataDelantera.setColor([0.45,0.1,0.0]);pataDelantera.setTextura(texturePataEstanteria);
		pataTrasera.setColor([0.45,0.1,0.0]);pataTrasera.setTextura(texturePataEstanteria);
	}
	estanteria.agregarHijo(patasDelanterasEstanteria);
	estanteria.agregarHijo(patasTraserasEstanteria);
	
	//estantes
	let largoEstante = 3.8,anchoEstante = 0.4,altoEstante= 0.02; 
	escalarObjeto(estanteInferior,[anchoEstante,altoEstante,largoEstante]);
	trasladarObjeto(estanteInferior,[0.0,0.5,0.0]);
	escalarObjeto(estanteMedio,[anchoEstante,altoEstante,largoEstante]);
	trasladarObjeto(estanteMedio,[0.0,1.0,0.0]);
	escalarObjeto(estanteSuperior,[anchoEstante,altoEstante,largoEstante]);
	trasladarObjeto(estanteSuperior,[0.0,1.5,0.0]);
	
	estanteInferior.setColor([0.04,0.88,0.76]); estanteInferior.setTextura(textureEstante);
	estanteMedio.setColor([0.04,0.88,0.76]);estanteMedio.setTextura(textureEstante);
	estanteSuperior.setColor([0.04,0.88,0.76]);estanteSuperior.setTextura(textureEstante);

	estanteria.agregarHijo(estanteInferior);
	estanteria.agregarHijo(estanteMedio);
	estanteria.agregarHijo(estanteSuperior);

	//ubicacion de la estanteria en la escena
	trasladarObjeto(estanteria,[-3.5,0.0,0.0]);
	objetos.push(estanteria);

}

/*Carga las formas que conforman el galpon*/
function cargarGalpon(objetos)
{
	console.log("[DEBUG] Cargando objetos del galpon");
	let largoPiso=10.0,anchoPiso= 10.0,altoGalpon = 1.0;
	let largoParedLateral = 8.0,anchoParedLateral = 1.0,altoParedGalpon = 2.5;

	galpon = new objeto3D;
	pisoGalpon = new objeto3D("plano",matrizModelado);


	escalarObjeto(pisoGalpon,[anchoPiso,1.0,largoPiso]);
	galpon.agregarHijo(pisoGalpon);

	pisoGalpon.setColor([0.93,0.7,0.66]);



	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));

	// Asynchronously load an image
	var image = new Image();
	image.src = "maps/StoneTilesFloor01_1K_BaseColor.png";
	image.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, texture);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});
	pisoGalpon.setTextura(texture);










	objetos.push(galpon);
}
/*Carga las formas que conforman el autoelevador*/
function cargarAutoElevador(objetos)
{
	console.log("[DEBUG] Cargando objetos del autoElevador");
	autoElevador = new objeto3D(); autoElevador.asignarIdentificadorObjeto("CAutoelevador");
	estructuraPala = new objeto3D;
	ruedas = new objeto3D;
	barraVertical1  = GenerarCubo();
	barraVertical2 = GenerarCubo();
	barraHorizontal1  = GenerarCubo();
	barraHorizontal2  = GenerarCubo();
	barraHorizontal3  = GenerarCubo();
	chasis = new objeto3D("chasis",matrizModelado);

	//chasis del autoElevador
	rotarObjeto(chasis,Math.PI/2,[1.0,0.0,0.0]);
	escalarObjeto(chasis,[1.5,1.0,0.5]);
	//pala que sostendra los objetos
	palaAutoElevador = GenerarCubo();
	escalarObjeto(palaAutoElevador,[0.4,0.01,0.3]);
	trasladarObjeto(palaAutoElevador,[0.85,0.10,0.0]);
	
	//barras de la estructura de la pala
	trasladarObjeto(barraVertical1,[0.65,0.6,0.1]);
	mat4.scale(barraVertical1.obtenerMatrizTransformacion(),barraVertical1.obtenerMatrizTransformacion(),[0.02,1.2,0.02]);

	trasladarObjeto(barraVertical2,[0.65,0.6,-0.1]);
	mat4.scale(barraVertical2.obtenerMatrizTransformacion(),barraVertical2.obtenerMatrizTransformacion(),[0.02,1.2,0.02]);

	trasladarObjeto(barraHorizontal1,[0.65,0.2,0.0]);
	mat4.scale(barraHorizontal1.obtenerMatrizTransformacion(),barraHorizontal1.obtenerMatrizTransformacion(),[0.015,0.03,0.25]);

	trasladarObjeto(barraHorizontal2,[0.65,0.7,0.0]);
	mat4.scale(barraHorizontal2.obtenerMatrizTransformacion(),barraHorizontal2.obtenerMatrizTransformacion(),[0.015,0.02,0.25]);

	trasladarObjeto(barraHorizontal3,[0.65,1.1,0.0]);
	mat4.scale(barraHorizontal3.obtenerMatrizTransformacion(),barraHorizontal3.obtenerMatrizTransformacion(),[0.015,0.02,0.25]);

	//relacion entre objetos del autoElevador
	estructuraPala.agregarHijo(barraHorizontal1);
	estructuraPala.agregarHijo(barraHorizontal2);
	estructuraPala.agregarHijo(barraHorizontal3);
	estructuraPala.agregarHijo(barraVertical1);
	estructuraPala.agregarHijo(barraVertical2);
	estructuraPala.agregarHijo(palaAutoElevador);
	autoElevador.agregarHijo(estructuraPala);
	autoElevador.agregarHijo(chasis);


	var textureChasis = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureChasis);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
	// Asynchronously load an image
	var image = new Image();
	image.src = "maps/Pattern05_1K_VarC.png";
	image.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, textureChasis);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,  gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,  gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});
	chasis.setTextura(textureChasis);

	var textureRueda = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureRueda);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 0, 255]));
	var imageRueda = new Image();
	imageRueda.src = "maps/rueda.jpg";
	imageRueda.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, textureRueda);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, imageRueda);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,  gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,  gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});

	
	trasladarObjeto(autoElevador,[0.0,0.25,0.0]);

	//ruedas
	let ruedaTI = new objeto3D("rueda");let ruedaTD = new objeto3D("rueda");
	let ruedaDI = new objeto3D("rueda");let ruedaDD = new objeto3D("rueda");
	escalarObjeto(ruedaTI,[0.3,0.1,0.3]);escalarObjeto(ruedaDI,[0.3,0.1,0.3]);
	rotarObjeto(ruedaTI,Math.PI/2,[1.0,0.0,0.0]);rotarObjeto(ruedaDI,Math.PI/2,[1.0,0.0,0.0]);
	trasladarObjeto(ruedaTI,[-0.3,0.18,0.28]);trasladarObjeto(ruedaDI,[0.3,0.18,0.28]);

	escalarObjeto(ruedaTD,[0.3,0.1,0.3]);escalarObjeto(ruedaDD,[0.3,0.1,0.3]);
	rotarObjeto(ruedaTD,Math.PI/2,[1.0,0.0,0.0]);rotarObjeto(ruedaDD,Math.PI/2,[1.0,0.0,0.0]);
	trasladarObjeto(ruedaTD,[-0.3,0.18,-0.28]);trasladarObjeto(ruedaDD,[0.3,0.18,-0.28]);
	ruedaTI.setTextura(textureRueda);ruedaTD.setTextura(textureRueda);
	ruedaDI.setTextura(textureRueda);ruedaDD.setTextura(textureRueda);

	ruedas.agregarHijo(ruedaTI);ruedas.agregarHijo(ruedaDI);
	ruedas.agregarHijo(ruedaTD);ruedas.agregarHijo(ruedaDD);
	autoElevador.agregarHijo(ruedas);

	var textureBarras = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureBarras);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
	// Asynchronously load an image
	var imageBarra = new Image();
	imageBarra.src = "maps/Marble03_1K_BaseColor.png";
	imageBarra.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, textureBarras);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, imageBarra);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,  gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,  gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});



	var texturePala = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texturePala);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
	// Asynchronously load an image
	var imagePala = new Image();
	imagePala.src = "maps/patron3.png";
	imagePala.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, texturePala);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, imagePala);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,  gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,  gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});
	palaAutoElevador.setTextura(texturePala);

	var textureBarras2 = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureBarras2);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
	// Asynchronously load an image
	var imageBarras2= new Image();
	imageBarras2.src = "maps/Marble09_1K_BaseColor.png";
	imageBarras2.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, textureBarras2);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, imageBarras2);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,  gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,  gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});
	//colores
	chasis.setColor([0.99,0.94,0.13]);
	palaAutoElevador.setColor([0.89,0.51,0.0]);
	barraHorizontal1.setColor([0.67,0.15,0.72]);barraHorizontal1.setTextura(textureBarras2);
	barraHorizontal2.setColor([0.67,0.15,0.72]);barraHorizontal2.setTextura(textureBarras2);
	barraHorizontal3.setColor([0.67,0.15,0.72]);barraHorizontal3.setTextura(textureBarras2);
	barraVertical1.setColor([0.7,0.7,0.7]);	barraVertical2.setColor([0.7,0.7,0.7]);
	barraVertical1.setTextura(textureBarras);barraVertical2.setTextura(textureBarras);


	ruedaTI.setColor([0.28,0.03,0.37]);ruedaTD.setColor([0.28,0.03,0.37]);
	ruedaDI.setColor([0.28,0.03,0.37]);ruedaDD.setColor([0.28,0.03,0.37]);




	objetos.push(autoElevador);
}


function cargarImpresora(objetos)
{

	var textureMetalVerde = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureMetalVerde);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0.0,1.0,0.0,1.0]));
	// Asynchronously load an image
	var image3 = new Image();
	image3.src = "maps/green_metal_rust_diff_1k.png";
	image3.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, textureMetalVerde);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image3);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});
	var textureOxido = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureOxido);
	 //Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0.0,1.0,0.0,1.0]));
	// Asynchronously load an image
	var image4 = new Image();
	image4.src = "maps/metal_grate_rusty_diff_1k.jpg";
	image4.addEventListener('load', function() {
  	// Now that the image has loaded make copy it to the texture.
  	gl.bindTexture(gl.TEXTURE_2D, textureOxido);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image4);
  	//gl.generateMipmap(gl.TEXTURE_2D);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
	});




	console.log("[DEBUG] Cargando objetos de la impresora");
	impresora = new objeto3D;//contenedor
	tuboImpresora = new objeto3D("cilindro",matrizModelado);

	
	escalarObjeto(tuboImpresora,[0.01,1.2,0.01]);

	CabezalImpresora = new objeto3D; // parte movil de la impresora

	agarreImpresora = GenerarCubo();
	escalarObjeto(agarreImpresora,[0.03,0.03,0.03]);
	trasladarObjeto(agarreImpresora,[0.0,0.03,0.0]);
	

	padImpresora = GenerarCubo();
	escalarObjeto(padImpresora,[0.2,0.01,0.2]);
	trasladarObjeto(padImpresora,[-0.15,0.01,0.0]);
	

	SujetadorPadImpresora = GenerarCubo();
	escalarObjeto(SujetadorPadImpresora,[0.01,0.02,0.1]);
	trasladarObjeto(SujetadorPadImpresora,[-0.15,0.03,0.0]);
	

	barraHorizontal1 = GenerarCubo();
	escalarObjeto(barraHorizontal1,[0.15,0.005,0.005]);
	trasladarObjeto(barraHorizontal1,[-0.075,0.03,+0.01]);
	
	barraHorizontal2 = GenerarCubo();
	escalarObjeto(barraHorizontal2,[0.15,0.005,0.005]);
	trasladarObjeto(barraHorizontal2,[-0.075,0.03,-0.01]);


	baseImpresora = new objeto3D("baseImpresora");
	escalarObjeto(baseImpresora,[0.5,0.8,0.5]);
	trasladarObjeto(baseImpresora,[-0.23,-0.45,0.0]);
	/*relacion entre objetos que conforman la impresora*/
	CabezalImpresora.agregarHijo(agarreImpresora);
	CabezalImpresora.agregarHijo(padImpresora);
	CabezalImpresora.agregarHijo(barraHorizontal1);
	CabezalImpresora.agregarHijo(barraHorizontal2);
	CabezalImpresora.agregarHijo(SujetadorPadImpresora);
	trasladarObjeto(CabezalImpresora,[0.0,0.245,0.0]);
	escalarObjeto(CabezalImpresora,[1.8,1.0,1.5]);

	impresora.agregarHijo(tuboImpresora);
	impresora.agregarHijo(CabezalImpresora);
	impresora.agregarHijo(baseImpresora);
	
	//colores
	barraHorizontal1.setColor([0.1,0.1,0.8]);barraHorizontal2.setColor([0.1,0.1,0.9]);
	SujetadorPadImpresora.setColor([0.1,0.9,0.1]);padImpresora.setColor([0.1,0.9,0.1]);
	barraHorizontal1.setTextura(textureMetalVerde);
	barraHorizontal2.setTextura(textureMetalVerde);
	SujetadorPadImpresora.setTextura(textureMetalVerde);
	padImpresora.setTextura(textureMetalVerde);
	agarreImpresora.setColor([0.1,0.9,0.1]);
	agarreImpresora.setTextura(textureMetalVerde);

	
	baseImpresora.setColor([0.7,0.7,0.7]);baseImpresora.setTextura(textureOxido);
	tuboImpresora.setColor([0.7,0.7,0.7]);tuboImpresora.setTextura(textureOxido);

	//ubicacion de la impresora en la escena
	trasladarObjeto(impresora,[2.0,0.6,0.0]);
	objetos.push(impresora);
}


// Genera un cubo de dimensiones de paredes con 2 tapas
function GenerarCubo()
{	nuevoCubo = new objeto3D("cubo",matrizModelado);
	return nuevoCubo;
}


function cargarObjetosPrueba(objetos)
{
	 var textureObjetoPrueba = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textureObjetoPrueba);
     //Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0.0,1.0,0.0,1.0]));
    // Asynchronously load an image
    var imageObjetoPrueba = new Image();
    imageObjetoPrueba.src = "maps/leather_red_03_coll1_1k.jpg";
    imageObjetoPrueba.addEventListener('load', function() {
    // Now that the image has loaded make copy it to the texture.
    gl.bindTexture(gl.TEXTURE_2D, textureObjetoPrueba);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, imageObjetoPrueba);
    //gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
    });


	let B1 = new objeto3D("B1");
	escalarObjeto(B1,[0.5,0.5,0.5]);
	trasladarObjeto(B1,[-2.0,0.25,-3.0]);
	B1.setTextura(textureObjetoPrueba);
	objetos.push(B1);

	let B2 = new objeto3D("B2");
	escalarObjeto(B2,[0.5,0.5,0.5]);
	trasladarObjeto(B2,[-4.0,0.25,-3.0]);
	B2.setTextura(textureObjetoPrueba);
	objetos.push(B2);

	let B3 = new objeto3D("B3");
	escalarObjeto(B3,[0.5,0.5,0.5]);
	trasladarObjeto(B3,[-1.0,0.25,-3.0]);
	B3.setTextura(textureObjetoPrueba);
	objetos.push(B3);

	let B4 = new objeto3D("B4");
	escalarObjeto(B4,[0.5,0.5,0.5]);
	trasladarObjeto(B4,[-3.0,0.25,-3.0]);
	B4.setTextura(textureObjetoPrueba);
	objetos.push(B4);

	// de revolucion
	let A1 = new objeto3D("A1");
	trasladarObjeto(A1,[0.0,0.5,-3.0]);
	A1.setTextura(textureObjetoPrueba);
	objetos.push(A1);

	let A2 = new objeto3D("A2");
	A2.setTextura(textureObjetoPrueba);
	trasladarObjeto(A2,[1.0,0.5,-3.0]);
	objetos.push(A2);

	let A3 = new objeto3D("A3");
	trasladarObjeto(A3,[2.0,0.5,-3.0]);
	A3.setTextura(textureObjetoPrueba);
	objetos.push(A3);
	let A4 = new objeto3D("A4");
	trasladarObjeto(A4,[3.0,0.5,-3.0]);
	A4.setTextura(textureObjetoPrueba);
	objetos.push(A4);

}