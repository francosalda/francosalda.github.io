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