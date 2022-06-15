
/*carga el conjunto de objetos de la escena en el array 'objetos'*/
function cargarObjetosEscena(objetos)
{
	console.log("[DEBUG] Cargando objetos de la escena");
	//cargarEstanteria(objetos);
	//cargarGalpon(objetos);
	cargarAutoElevador(objetos);
	
	
	//cargarImpresora(objetos)
	
	
	

	
	
	asignarMallasObjetos(objetos);
}



function cargarGalpon(objetos)
{
	galpon = new objeto3D; // objeto contenedor
	console.log("[DEBUG] Cargando objetos del galpon");

	pisoGalpon = new objeto3D("plano",matrizModelado);
	mat4.scale(pisoGalpon.obtenerMatrizTransformacion(),pisoGalpon.obtenerMatrizTransformacion(),[10.0,1.0,10.0]);
	galpon.agregarHijo(pisoGalpon);
	objetos.push(galpon);
}

function cargarImpresora(objetos)
{
	impresora = new objeto3D;//contenedor
	tuboImpresora = new objeto3D("cilindro",matrizModelado);
	trasladarObjeto(tuboImpresora,[0.0,0.0,0.0]);
	escalarObjeto(tuboImpresora,[0.01,1.2,0.01]);
	
	CabezalImpresora = new objeto3D; // parte movil de la impresora

	agarreImpresora = GenerarCubo();
	trasladarObjeto(agarreImpresora,[0.0,0.03,0.0]);
	escalarObjeto(agarreImpresora,[0.03,0.03,0.03]);

	padImpresora = GenerarCubo();
	trasladarObjeto(padImpresora,[-0.15,0.01,0.0]);
	escalarObjeto(padImpresora,[0.2,0.01,0.2]);

	SujetadorPadImpresora = GenerarCubo();
	trasladarObjeto(SujetadorPadImpresora,[-0.15,0.03,0.0]);
	escalarObjeto(SujetadorPadImpresora,[0.01,0.02,0.1]);

	barraHorizontal1 = GenerarCubo();
	trasladarObjeto(barraHorizontal1,[-0.075,0.03,+0.01]);
	escalarObjeto(barraHorizontal1,[0.15,0.005,0.005]);
	barraHorizontal2 = GenerarCubo();
	trasladarObjeto(barraHorizontal2,[-0.075,0.03,-0.01]);
	escalarObjeto(barraHorizontal2,[0.15,0.005,0.005]);

	CabezalImpresora.agregarHijo(agarreImpresora);
	CabezalImpresora.agregarHijo(padImpresora);
	CabezalImpresora.agregarHijo(barraHorizontal1);
	CabezalImpresora.agregarHijo(barraHorizontal2);
	CabezalImpresora.agregarHijo(SujetadorPadImpresora);
	impresora.agregarHijo(tuboImpresora);
	impresora.agregarHijo(CabezalImpresora);
	
	
	objetos.push(impresora);

}

function cargarAutoElevador(objetos)
{
	//posicion de los elementos del objeto
	autoElevador = new objeto3D();
	estructuraPala = new objeto3D;
	barraVertical1  = GenerarCubo();
	barraVertical2 = GenerarCubo();
	barraHorizontal1  = GenerarCubo();
	barraHorizontal2  = GenerarCubo();
	barraHorizontal3  = GenerarCubo();
	chasis = new objeto3D("chasis",matrizModelado);

	//chasis del autoElevador
	rotarObjeto(chasis,Math.PI/2,[1.0,0.0,0.0]);
	escalarObjeto(chasis,[1.5,0.5,1.0]);
	//pala que sostendra los objetos
	palaAutoElevador = GenerarCubo();
	trasladarObjeto(palaAutoElevador,[0.8,0.005+0.5,0.0]);
	mat4.scale(palaAutoElevador.obtenerMatrizTransformacion(),palaAutoElevador.obtenerMatrizTransformacion(),[0.3,0.01,0.3]);
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
	estructuraPala.agregarHijo(palaAutoElevador);
	estructuraPala.agregarHijo(barraHorizontal1);
	estructuraPala.agregarHijo(barraHorizontal2);
	estructuraPala.agregarHijo(barraHorizontal3);
	estructuraPala.agregarHijo(barraVertical1);
	estructuraPala.agregarHijo(barraVertical2);
	autoElevador.agregarHijo(chasis);
	autoElevador.agregarHijo(estructuraPala);
	
	//posicionar el autoElevador en la escena
	trasladarObjeto(autoElevador,[0.0,0.0,0.0]);


	//calcularFinalMatrizNodos(autoElevador);
	objetos.push(autoElevador);
}







function cargarEstanteria(objetos)
{
	console.log("[DEBUG] Cargando objetos de la estanteria");
	estanteria = new objeto3D;
	patasDelanterasEstanteria = new objeto3D;//contenedor
	patasTraserasEstanteria = new objeto3D;
	estanteInferior = GenerarCubo();
	estanteMedio = GenerarCubo();
	estanteSuperior = GenerarCubo();
	let separacionEntrePatas = 0.40;
	let anchoEstante = 3.8;
	let altoPatas = 1.6;

	for(let i = 0 ; i < 9 ; i++)
	{
		let pataDelantera = GenerarCubo();
		let pataTrasera = GenerarCubo();

		trasladarObjeto(pataDelantera,[-1.5,0.8,-1.5+i*separacionEntrePatas]);
		trasladarObjeto(pataTrasera,[-2.25,0.8,-1.5+i*separacionEntrePatas]);

		mat4.scale(pataDelantera.obtenerMatrizTransformacion(),pataDelantera.obtenerMatrizTransformacion(),[0.04,altoPatas,0.04]);
		mat4.scale(pataTrasera.obtenerMatrizTransformacion(),pataTrasera.obtenerMatrizTransformacion(),[0.04,altoPatas,0.04]);
		
		patasDelanterasEstanteria.agregarHijo(pataDelantera);
		patasTraserasEstanteria.agregarHijo(pataTrasera)
	}
	
	estanteria.agregarHijo(patasDelanterasEstanteria);
	estanteria.agregarHijo(patasTraserasEstanteria);

	//estantes
	trasladarObjeto(estanteInferior,[0.0,0.5,0.0]);
	mat4.scale(estanteInferior.obtenerMatrizTransformacion(),estanteInferior.obtenerMatrizTransformacion(),[1.0,0.05,anchoEstante]);
	trasladarObjeto(estanteMedio,[0.0,1.0,0.0]);
	mat4.scale(estanteMedio.obtenerMatrizTransformacion(),estanteMedio.obtenerMatrizTransformacion(),[1.0,0.05,3.8]);
	trasladarObjeto(estanteSuperior,[0.0,1.5,0.0]);
	mat4.scale(estanteSuperior.obtenerMatrizTransformacion(),estanteSuperior.obtenerMatrizTransformacion(),[1.0,0.05,anchoEstante]);

	estanteria.agregarHijo(estanteInferior);
	estanteria.agregarHijo(estanteMedio);
	estanteria.agregarHijo(estanteSuperior);
	
	trasladarObjeto(estanteria,[-2.0,0.0,0.0]);

	objetos.push(estanteria);

}


// Genera un cubo de dimensiones 1x1x1, con dos tapas + paredes
function GenerarCubo()
{	nuevoCubo = new objeto3D("cubo",matrizModelado);
	return nuevoCubo;
}

