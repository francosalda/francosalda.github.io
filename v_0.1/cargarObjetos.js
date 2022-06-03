
/*carga el conjunto de objetos de la escena en el array 'objetos'*/
function cargarObjetosEscena(objetos)
{
	console.log("[DEBUG] Cargando objetos de la escena");
	//cargarEstanteria(objetos);
	cargarGalpon(objetos);
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
	galpon.agregarHijo(pisoGalpon);
	paredGalpon = new objeto3D("plano",matrizModelado);
	galpon.agregarHijo(paredGalpon);

	objetos.push(galpon);
}

function cargarEstanteria(objetos)
{
	console.log("[DEBUG] Cargando objetos de la estanteria");
	estanteria = new objeto3D;
	objetos.push(estanteria);




}

