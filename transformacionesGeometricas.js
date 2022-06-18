
//Rota un objeto que puede estar compuesto por otros objetos.
function rotarObjeto(objeto,angulo,ejeRotacion)
{
	mat4.rotate(objeto.obtenerMatrizTransformacion(),objeto.obtenerMatrizTransformacion(),angulo,ejeRotacion);
	//en caso de ser un contenedor, deben rotarse tambien sus hijos
	if(objeto.esUnContenedor())
	{
		calcularFinalMatrizNodos(objeto,objeto.obtenerMatrizTransformacion());
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
	mat4.scale(objeto.obtenerMatrizTransformacion(),objeto.obtenerMatrizTransformacion(),vectorEscala);
	//en caso de ser un contenedor, deben escalarse tambien sus hijos
	if(objeto.esUnContenedor())
	{
		calcularFinalMatrizNodos(objeto,objeto.obtenerMatrizTransformacion());
	}
}
//recibe el objeto padre y su matriz  y calcula la matriz final de cada nodo del subarbol
function calcularFinalMatrizNodos(objeto,matrizPadre)
{
	let aux = mat4.create();
	if(objeto.esUnContenedor())
	{
		//si es un contenedor deben calcularse las nuevas matrices de sus hijos
		for(let i=0; i < objeto.obtenerHijos().length; i++)
		{
			mat4.multiply(aux,matrizPadre,(objeto.obtenerHijos())[i].obtenerMatrizTransformacion());
			(objeto.obtenerHijos())[i].asignarMatrizTransformacion(aux);
			if((objeto.obtenerHijos())[i].esUnContenedor())
			{
				calcularFinalMatrizNodos((objeto.obtenerHijos())[i],objeto.obtenerMatrizTransformacion());	
			}
			
		}
	}
	else
	{
		mat4.multiply(aux,matrizPadre,objeto.obtenerMatrizTransformacion());
		objeto.asignarMatrizTransformacion(aux);
		console.log("DEBUG ENTRA AL ELSE IMPOSIBLE DE ENTRAR");
	}

}


/*Asigna una matriz a un objeto que puede estar compuesto por otros objetos
(solo para pruebas)*/
function transformarObjeto(objeto,matriz)
{
	objeto.asignarMatrizTransformacion(matriz);

	if(objeto.esUnContenedor())
	{
		calcularFinalMatrizNodos(objeto,objeto.obtenerMatrizTransformacion());
	}
	
}