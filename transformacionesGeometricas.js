
//Rota un objeto que puede estar compuesto por otros objetos.
function rotarObjeto(objeto,angulo,ejeRotacion)
{
	let matrizRotacion = mat4.create();
	mat4.rotate(matrizRotacion,matrizRotacion,angulo,ejeRotacion);
	mat4.multiply(objeto.obtenerMatrizTransformacion(),matrizRotacion,objeto.obtenerMatrizTransformacion());
	
	//en caso de ser un contenedor, deben rotarse tambien sus hijos
	if(objeto.esUnContenedor())
	{
		for(let i = 0 ; i <objeto.obtenerHijos().length ; i++ )
		{
			rotarObjeto((objeto.obtenerHijos())[i],angulo,ejeRotacion);
		}
	}
	
}


function trasladarObjeto(objeto,vectorTraslacion)
{
	let matrizTraslacion = mat4.create();
	mat4.translate(matrizTraslacion,matrizTraslacion,vectorTraslacion);
	mat4.multiply(objeto.obtenerMatrizTransformacion(),matrizTraslacion,objeto.obtenerMatrizTransformacion());
	
	//en caso de ser un contenedor, deben trasladarse tambien sus hijos
	if(objeto.esUnContenedor())
	{
		
		for(let i = 0 ; i <objeto.obtenerHijos().length ; i++ )
		{
			trasladarObjeto((objeto.obtenerHijos())[i],vectorTraslacion);
		}
	}		
}

//Escala un objeto que puede estar compuesto por otros objetos.
function escalarObjeto(objeto,vectorEscala)
{
	let matrizEscalado = mat4.create();
	mat4.scale(matrizEscalado,matrizEscalado,vectorEscala);
	mat4.multiply(objeto.obtenerMatrizTransformacion(),matrizEscalado,objeto.obtenerMatrizTransformacion());
	if(objeto.esUnContenedor())
	{
		for(let i = 0 ; i <objeto.obtenerHijos().length ; i++ )
		{
			escalarObjeto((objeto.obtenerHijos())[i],vectorEscala);
		}
	}


}
