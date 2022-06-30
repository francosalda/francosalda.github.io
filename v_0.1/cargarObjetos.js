
/*carga el conjunto de objetos de la escena en el array 'objetos'*/
function cargarObjetosEscena(objetos)
{
	console.log("[DEBUG] Cargando objetos de la escena");

/*Arreglar el chasis , sus vertices y luego en objeto3d.js para que se cargue correctamente*/
	cargarAutoElevador(objetos);
	cargarEstanteria(objetos);
	cargarGalpon(objetos);
	cargarImpresora(objetos)

	asignarMallasObjetos(objetos);
}



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
	

	estanteria.agregarHijo(estanteInferior);
	estanteria.agregarHijo(estanteMedio);
	estanteria.agregarHijo(estanteSuperior);

	//ubicacion de la estanteria en la escena
	trasladarObjeto(estanteria,[-1.5,0.0,0.0]);



	objetos.push(estanteria);

}

function cargarGalpon(objetos)
{
	console.log("[DEBUG] Cargando objetos del galpon");
	let largoPiso=10.0,anchoPiso= 10.0,altoGalpon = 1.0;
	let largoParedLateral = 8.0,anchoParedLateral = 1.0,altoParedGalpon = 2.5;

	galpon = new objeto3D;
	pisoGalpon = new objeto3D("plano",matrizModelado);

	escalarObjeto(pisoGalpon,[anchoPiso,1.0,largoPiso]);

	galpon.agregarHijo(pisoGalpon);
	objetos.push(galpon);
}
function cargarAutoElevador(objetos)
{

	console.log("[DEBUG] Cargando objetos del autoElevador");
	//posicion de los elementos del objeto
	autoElevador = new objeto3D(); autoElevador.asignarIdentificadorObjeto("CAutoelevador");
	estructuraPala = new objeto3D;
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
	trasladarObjeto(palaAutoElevador,[0.85,0.3,0.0]);
	
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
	//posicionar el autoElevador en la escena
	//trasladarObjeto(autoElevador,[0.0,0.2,0.0]);
	

	

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
	

	CabezalImpresora.agregarHijo(agarreImpresora);
	CabezalImpresora.agregarHijo(padImpresora);
	CabezalImpresora.agregarHijo(barraHorizontal1);
	CabezalImpresora.agregarHijo(barraHorizontal2);
	CabezalImpresora.agregarHijo(SujetadorPadImpresora);
	impresora.agregarHijo(tuboImpresora);
	impresora.agregarHijo(CabezalImpresora);
	
	//ubicacion de la impresora en la escena
	trasladarObjeto(impresora,[1.5,0.3,0.0]);
	
	objetos.push(impresora);

}



// Genera un cubo de dimensiones 1x1x1, con dos tapas + paredes
function GenerarCubo()
{	nuevoCubo = new objeto3D("cubo",matrizModelado);
	return nuevoCubo;
}


