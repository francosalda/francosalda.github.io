
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
		pataDelantera.setColor([0.45,0.1,0.0]);
		pataTrasera.setColor([0.45,0.1,0.0]);
		pataDelantera.setTexture(textures[mapaTexturas.get("textMadera")]);
		pataTrasera.setTexture(textures[mapaTexturas.get("textMadera")]);
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
	
	estanteInferior.setColor([0.04,0.88,0.76]);
	estanteInferior.setTexture(textures[mapaTexturas.get("textMaderaRayada")]);
	estanteMedio.setColor([0.04,0.88,0.76]);
	estanteMedio.setTexture(textures[mapaTexturas.get("textMaderaRayada")]);
	estanteSuperior.setColor([0.04,0.88,0.76]);
	estanteSuperior.setTexture(textures[mapaTexturas.get("textMaderaRayada")]);

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
	techo = new objeto3D("techo");
	pisoGalpon = new objeto3D("plano",matrizModelado);
	paredTrasera = new objeto3D("plano",matrizModelado);
	paredDelantera = new objeto3D("plano",matrizModelado);
	paredLateralDerecha = new objeto3D("plano",matrizModelado);
	paredLateralIzquierda = new objeto3D("plano",matrizModelado);

	escalarObjeto(pisoGalpon,[anchoPiso,1.0,largoPiso]);
	galpon.agregarHijo(pisoGalpon);

	rotarObjeto(techo,-Math.PI/2,[1.0,0.0,0.0]);
	rotarObjeto(techo,Math.PI/2,[0.0,1.0,0.0]);
	trasladarObjeto(techo,[0.0,3.5,0.0]);
	escalarObjeto(techo,[12.1,1.0,7.0]);
	galpon.agregarHijo(techo);


	rotarObjeto(paredTrasera,Math.PI/2,[1.0,0.0,0.0]);
	escalarObjeto(paredTrasera,[4.0,1.0,4.0]);
	trasladarObjeto(paredTrasera,[0.0,0.0,-3.5]);
	galpon.agregarHijo(paredTrasera);

	rotarObjeto(paredLateralDerecha,Math.PI/2,[1.0,0.0,0.0]);
	rotarObjeto(paredLateralDerecha,Math.PI/2,[0.0,1.0,0.0]);
	escalarObjeto(paredLateralDerecha,[4.0,1.0,4.0]);
	trasladarObjeto(paredLateralDerecha,[-6.0,0.0,0.0]);
	galpon.agregarHijo(paredLateralDerecha);

	rotarObjeto(paredLateralIzquierda,Math.PI/2,[1.0,0.0,0.0]);
	rotarObjeto(paredLateralIzquierda,-Math.PI/2,[0.0,1.0,0.0]);
	escalarObjeto(paredLateralIzquierda,[4.0,1.0,4.0]);
	trasladarObjeto(paredLateralIzquierda,[6.0,0.0,0.0]);
	galpon.agregarHijo(paredLateralIzquierda);

	rotarObjeto(paredDelantera,-Math.PI/2,[1.0,0.0,0.0]);
	escalarObjeto(paredDelantera,[4.0,1.0,4.0]);
	trasladarObjeto(paredDelantera,[0.0,0.0,3.5]);
	galpon.agregarHijo(paredDelantera);


	/*texturas y colores*/
	pisoGalpon.setColor([0.93,0.7,0.66]);
	pisoGalpon.setTexture(textures[mapaTexturas.get("textPisoPiedra")]);
	paredTrasera.setTexture(textures[mapaTexturas.get("MetalParedes")]);
	paredLateralDerecha.setTexture(textures[mapaTexturas.get("MetalParedes")]);
	paredLateralIzquierda.setTexture(textures[mapaTexturas.get("MetalParedes")]);
	paredDelantera.setTexture(textures[mapaTexturas.get("MetalParedes")]);
	techo.setTexture(textures[mapaTexturas.get("MetalParedes")]);
	
	objetos.push(galpon);
}
/*Carga las formas que conforman el autoelevador*/
function cargarAutoElevador(objetos)
{
	console.log("[DEBUG] Cargando objetos del autoElevador");
	autoElevador = new objeto3D(); autoElevador.asignarIdentificadorObjeto("CAutoelevador");
	estructuraPala = new objeto3D;
	ruedas = new objeto3D;
	asiento = new objeto3D("asiento");
	salpicadero = new objeto3D("asiento"); // tiene la misma forma geometrica que el asiento
	barraVertical1  = GenerarCubo();
	barraVertical2 = GenerarCubo();
	barraHorizontal1  = GenerarCubo();
	barraHorizontal2  = GenerarCubo();
	barraHorizontal3  = GenerarCubo();
	chasis = new objeto3D("chasis",matrizModelado);

	//chasis del autoElevador
	rotarObjeto(chasis,Math.PI/2,[1.0,0.0,0.0]);
	escalarObjeto(chasis,[1.5,1.0,0.5]);
	//asiento del conductor


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

	//asiento
	rotarObjeto(asiento,-Math.PI/2,[1.0,0.0,0.0]);
	rotarObjeto(asiento,Math.PI,[0.0,1.0,0.0]);
	trasladarObjeto(asiento,[-0.8,0.8,0.0]);
	escalarObjeto(asiento,[0.3,0.4,0.3]);
	//salpicadero
	rotarObjeto(salpicadero,-Math.PI/2,[1.0,0.0,0.0]);
	trasladarObjeto(salpicadero,[0.5,1.0,0.0]);
	escalarObjeto(salpicadero,[0.5,0.2,0.3]);

	

	//relacion entre objetos del autoElevador
	estructuraPala.agregarHijo(barraHorizontal1);
	estructuraPala.agregarHijo(barraHorizontal2);
	estructuraPala.agregarHijo(barraHorizontal3);
	estructuraPala.agregarHijo(barraVertical1);
	estructuraPala.agregarHijo(barraVertical2);
	estructuraPala.agregarHijo(palaAutoElevador);
	autoElevador.agregarHijo(salpicadero);
	autoElevador.agregarHijo(asiento);
	autoElevador.agregarHijo(estructuraPala);
	autoElevador.agregarHijo(chasis);
	
	trasladarObjeto(autoElevador,[0.0,0.25,0.0]);

	//ruedas
	var ruedaTI = new objeto3D("rueda");var ruedaTD = new objeto3D("rueda");
	var ruedaDI = new objeto3D("rueda");var ruedaDD = new objeto3D("rueda");
	escalarObjeto(ruedaTI,[0.3,0.1,0.3]);escalarObjeto(ruedaDI,[0.3,0.1,0.3]);
	rotarObjeto(ruedaTI,Math.PI/2,[1.0,0.0,0.0]);rotarObjeto(ruedaDI,Math.PI/2,[1.0,0.0,0.0]);
	trasladarObjeto(ruedaTI,[-0.3,0.18,0.28]);trasladarObjeto(ruedaDI,[0.3,0.18,0.28]);

	escalarObjeto(ruedaTD,[0.3,0.1,0.3]);escalarObjeto(ruedaDD,[0.3,0.1,0.3]);
	rotarObjeto(ruedaTD,-Math.PI/2,[1.0,0.0,0.0]);rotarObjeto(ruedaDD,-Math.PI/2,[1.0,0.0,0.0]);
	trasladarObjeto(ruedaTD,[-0.3,0.18,-0.28]);trasladarObjeto(ruedaDD,[0.3,0.18,-0.28]);

	ruedas.agregarHijo(ruedaTI);ruedas.agregarHijo(ruedaDI);
	ruedas.agregarHijo(ruedaTD);ruedas.agregarHijo(ruedaDD);
	autoElevador.agregarHijo(ruedas);

	//colores
	chasis.setColor([0.99,0.94,0.13]);
	palaAutoElevador.setColor([0.89,0.51,0.0]);
	barraHorizontal1.setColor([0.67,0.15,0.72]);
	barraHorizontal2.setColor([0.67,0.15,0.72]);
	barraHorizontal3.setColor([0.67,0.15,0.72]);
	barraVertical1.setColor([0.7,0.7,0.7]);	barraVertical2.setColor([0.7,0.7,0.7]);
	ruedaTI.setColor([0.28,0.03,0.37]);ruedaTD.setColor([0.28,0.03,0.37]);
	ruedaDI.setColor([0.28,0.03,0.37]);ruedaDD.setColor([0.28,0.03,0.37]);
	//texturas
	ruedaDI.setTexture(textures[mapaTexturas.get("textRueda")]);
	ruedaDD.setTexture(textures[mapaTexturas.get("textRueda")]);
	ruedaTI.setTexture(textures[mapaTexturas.get("textRueda")]);
	ruedaTD.setTexture(textures[mapaTexturas.get("textRueda")]);
	chasis.setTexture(textures[mapaTexturas.get("textGruaMetalica")]);
	palaAutoElevador.setTexture(textures[mapaTexturas.get("textMetalAzul")]);
	barraVertical1.setTexture(textures[mapaTexturas.get("textCueroRojo")]);
	barraVertical2.setTexture(textures[mapaTexturas.get("textCueroRojo")]);
	barraHorizontal1.setTexture(textures[mapaTexturas.get("textMetalOxidado2")]);
	barraHorizontal2.setTexture(textures[mapaTexturas.get("textMetalOxidado2")]);
	barraHorizontal3.setTexture(textures[mapaTexturas.get("textMetalOxidado2")]);
	asiento.setTexture(textures[mapaTexturas.get("textAsiento")]);
	salpicadero.setTexture(textures[mapaTexturas.get("textCueroBlanco")]);



	objetos.push(autoElevador);
}


function cargarImpresora(objetos)
{
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
	agarreImpresora.setColor([0.1,0.9,0.1]);
	baseImpresora.setColor([0.7,0.7,0.7]);
	tuboImpresora.setColor([0.7,0.7,0.7]);

	//texturas
	barraHorizontal1.setTexture(textures[mapaTexturas.get("textMetalVerde")]);
	barraHorizontal2.setTexture(textures[mapaTexturas.get("textMetalVerde")]);
	agarreImpresora.setTexture(textures[mapaTexturas.get("textMetalVerde")]);
	padImpresora.setTexture(textures[mapaTexturas.get("textMetalVerde")]);
	SujetadorPadImpresora.setTexture(textures[mapaTexturas.get("textMetalVerde")]);
	baseImpresora.setTexture(textures[mapaTexturas.get("textMetalGris")]);
	tuboImpresora.setTexture(textures[mapaTexturas.get("textMetalGris")]);


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

	let B1 = new objeto3D("B1");
	escalarObjeto(B1,[0.5,0.5,0.5]);
	trasladarObjeto(B1,[-2.0,0.25,-3.0]);
	B1.setTexture(textures[mapaTexturas.get("textAjedrez")]);
	objetos.push(B1);

	let B2 = new objeto3D("B2");
	escalarObjeto(B2,[0.5,0.5,0.5]);
	trasladarObjeto(B2,[-4.0,0.25,-3.0]);
	B2.setTexture(textures[mapaTexturas.get("textAjedrez")]);
	objetos.push(B2);

	let B3 = new objeto3D("B3");
	escalarObjeto(B3,[0.5,0.5,0.5]);
	trasladarObjeto(B3,[-1.0,0.25,-3.0]);
	B3.setTexture(textures[mapaTexturas.get("textAjedrez")]);
	objetos.push(B3);

	let B4 = new objeto3D("B4");
	escalarObjeto(B4,[0.5,0.5,0.5]);
	trasladarObjeto(B4,[-3.0,0.25,-3.0]);
	B4.setTexture(textures[mapaTexturas.get("textAjedrez")]);
	objetos.push(B4);

	// de revolucion
	let A1 = new objeto3D("A1");
	trasladarObjeto(A1,[0.0,0.5,-3.0]);
	A1.setTexture(textures[mapaTexturas.get("textMarmol")]);
	objetos.push(A1);

	let A2 = new objeto3D("A2");
	trasladarObjeto(A2,[1.0,0.5,-3.0]);
	A2.setTexture(textures[mapaTexturas.get("textMarmol")]);
	objetos.push(A2);

	let A3 = new objeto3D("A3");
	trasladarObjeto(A3,[2.0,0.5,-3.0]);
	A3.setTexture(textures[mapaTexturas.get("textMarmol")]);
	objetos.push(A3);
	let A4 = new objeto3D("A4");
	A4.setTexture(textures[mapaTexturas.get("textMarmol")]);
	trasladarObjeto(A4,[3.0,0.5,-3.0]);
	objetos.push(A4);

}