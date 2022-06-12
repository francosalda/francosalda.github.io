

function transformarObjeto(objeto,matriz)
{
	objeto.asignarMatrizTransformacion(matriz);
	if(objeto.esUnContenedor())
	{
		for(let i=0; i < objeto.obtenerHijos().length; i++)
		{

			transformarObjeto((objeto.obtenerHijos())[i],matriz);
		}
	}

}



function rotarObjeto(objeto,angulo,ejeRotacion)
{
	if(objeto.esUnContenedor())
	{
		for(let i=0; i < objeto.obtenerHijos().length; i++)
		{
			rotarObjeto((objeto.obtenerHijos())[i],angulo,ejeRotacion);
		}
	}
	else
	{
		mat4.rotate(objeto.obtenerMatrizTransformacion(),objeto.obtenerMatrizTransformacion(),angulo,ejeRotacion);
	}
}


//Traslada un objeto que puede estar compuesto por otros objetos.
function trasladarObjeto(objeto,vectorTraslacion)
{
	if(objeto.esUnContenedor())
	{
		for(let i=0; i < objeto.obtenerHijos().length; i++)
		{
			trasladarObjeto((objeto.obtenerHijos())[i],vectorTraslacion);
		}
	}
	else
	{
		mat4.translate(objeto.obtenerMatrizTransformacion(),objeto.obtenerMatrizTransformacion(),vectorTraslacion);
	}
}
//Escala un objeto que puede estar compuesto por otros objetos.
function escalarObjeto(objeto,vectorEscala)
{	
	if(objeto.esUnContenedor())
	{
		for(let i=0; i < objeto.obtenerHijos().length; i++)
		{
			escalarObjeto((objeto.obtenerHijos())[i],vectorEscala);
		}
	}
	else
	{
		mat4.scale(objeto.obtenerMatrizTransformacion(),objeto.obtenerMatrizTransformacion(),vectorEscala);
	}

}

