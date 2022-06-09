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