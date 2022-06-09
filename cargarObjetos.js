
/*carga el conjunto de objetos de la escena en el array 'objetos'*/
function cargarObjetosEscena(objetos)
{
	console.log("[DEBUG] Cargando objetos de la escena");
	//cargarEstanteria(objetos);

	//cargarGalpon(objetos);
	barrido = new objeto3D("paredCubo",matrizModelado);
	objetos.push(barrido);

	
	asignarMallasObjetos(objetos);
}

/*le asigna la malla de triangulo a los objetos de la escena*/
function asignarMallasObjetos(objetos)
{
	for(let i=0; i < objetos.length; i++)
	{
		//si es un contenedor, recorro los hijos
		if(objetos[i].esUnContenedor())
		{
			asignarMallasObjetos(objetos[i].obtenerHijos());
		}
		else
		{
			//si no es un contenedor le asigno la malla correspondiente
			objetos[i].asignarMallaDeTriangulos();
		}
		
	}

}

function cargarGalpon(objetos)
{
	galpon = new objeto3D; // objeto contenedor
	console.log("[DEBUG] Cargando objetos del galpon");

	pisoGalpon = new objeto3D("plano",matrizModelado);
	mat4.scale(pisoGalpon.obtenerMatrizTransformacion(),pisoGalpon.obtenerMatrizTransformacion(),[10.0,1.0,10.0]);
	galpon.agregarHijo(pisoGalpon);

	paredGalpon = new objeto3D("plano",matrizModelado);
	mat4.translate(paredGalpon.obtenerMatrizTransformacion(),paredGalpon.obtenerMatrizTransformacion(),[0.0,0.5,0.0]);
	mat4.scale(paredGalpon.obtenerMatrizTransformacion(),paredGalpon.obtenerMatrizTransformacion(),[8.0,1.0,1.0]);
	mat4.rotate(paredGalpon.obtenerMatrizTransformacion(),paredGalpon.obtenerMatrizTransformacion(),Math.PI/2,[1.0,0.0,0.0]);
	galpon.agregarHijo(paredGalpon);

	objetos.push(galpon);
}

function cargarEstanteria(objetos)
{
	console.log("[DEBUG] Cargando objetos de la estanteria");
	estanteria = new objeto3D;
	estanteriaInferior = new objeto3D("plano",matrizModelado);
	mat4.scale(estanteriaInferior.obtenerMatrizTransformacion(),estanteriaInferior.obtenerMatrizTransformacion(),[0.03,1.0,0.2]);
	mat4.translate(estanteriaInferior.obtenerMatrizTransformacion(),estanteriaInferior.obtenerMatrizTransformacion(),[-7.0,0.01,0.0]);
	estanteriaMedia = new objeto3D("plano",matrizModelado);
	mat4.scale(estanteriaMedia.obtenerMatrizTransformacion(),estanteriaMedia.obtenerMatrizTransformacion(),[0.03,1.0,0.2]);
	mat4.translate(estanteriaMedia.obtenerMatrizTransformacion(),estanteriaMedia.obtenerMatrizTransformacion(),[-7.0,0.04,0.0]);
	estanteriaSuperior = new objeto3D("plano",matrizModelado);
	mat4.scale(estanteriaSuperior.obtenerMatrizTransformacion(),estanteriaSuperior.obtenerMatrizTransformacion(),[0.03,1.0,0.2]);
	mat4.translate(estanteriaSuperior.obtenerMatrizTransformacion(),estanteriaSuperior.obtenerMatrizTransformacion(),[-7.0,0.07,0.0]);

	estanteria.agregarHijo(estanteriaInferior);
	estanteria.agregarHijo(estanteriaMedia);
	estanteria.agregarHijo(estanteriaSuperior);
	objetos.push(estanteria);

}

