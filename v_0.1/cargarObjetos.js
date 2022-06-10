
/*carga el conjunto de objetos de la escena en el array 'objetos'*/
function cargarObjetosEscena(objetos)
{
	console.log("[DEBUG] Cargando objetos de la escena");
	cargarEstanteria(objetos);
	cargarGalpon(objetos);
	
	

	
	asignarMallasObjetos(objetos);
}



function cargarGalpon(objetos)
{
	galpon = new objeto3D; // objeto contenedor
	console.log("[DEBUG] Cargando objetos del galpon");

	pisoGalpon = new objeto3D("plano",matrizModelado);
	mat4.scale(pisoGalpon.obtenerMatrizTransformacion(),pisoGalpon.obtenerMatrizTransformacion(),[10.0,1.0,10.0]);
	galpon.agregarHijo(pisoGalpon);

	//paredGalpon = new objeto3D("plano",matrizModelado);
	//mat4.translate(paredGalpon.obtenerMatrizTransformacion(),paredGalpon.obtenerMatrizTransformacion(),[0.0,0.5,0.0]);
	//mat4.scale(paredGalpon.obtenerMatrizTransformacion(),paredGalpon.obtenerMatrizTransformacion(),[8.0,1.0,1.0]);
	//mat4.rotate(paredGalpon.obtenerMatrizTransformacion(),paredGalpon.obtenerMatrizTransformacion(),Math.PI/2,[1.0,0.0,0.0]);
	//galpon.agregarHijo(paredGalpon);

	objetos.push(galpon);
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
