function superficieRevolucion(radio)
{
	 this.getPosicion=function(u,curvaGeometrica,tramo)
    {
       
        let punto = curvaGeometrica.calcularPuntoCurva(u,tramo);
        return [punto.x-radio,punto.y ,punto.z,1];
    }
    this.getNormal=function(u,v,curvaGeometrica,curvaTrayectoria,tramo)
    {
        let tangenteTrayectoria = curvaTrayectoria.getTangente(v);
        let tangenteForma2D =  curvaGeometrica.calcularPuntoCurvaDerivada(u,tramo);
        let normal = productoVectorial(tangenteForma2D,tangenteTrayectoria);
        normal.x = normal.x-radio ;
        return normal;
    }

    this.getCoordenadasTextura=function(u,v){
        return [1.0,0.1];
    }


	
}




function recorridoCircular(t)
{
	this.getPosicion=function(t)
	{

		t = (t*2*Math.PI) / 360;
		let r = 1;
		/* [x(t),y(t),z(t)]*/
		let punto = [r*Math.cos(t),0.0,r*Math.sin(t)];
		return punto;
	}
	this.getTangente = function(t)
	{
		let r = 1;
		 t =  (t*2*Math.PI) / 360;
		/* [dx(t)/dx, dy(t)/dy, dz(t)/dz]*/
		let puntoDer = [-r*Math.sin(t),0.0,r*Math.cos(t)];
		return puntoDer;
	}
	this.getBiNormal = function(t) 
	{
		let puntoBiNormal= [0.0,1.0,0.0];
		return puntoBiNormal;
	}

	this.getNormal= function(biNormal,tangente,t)
	{
		//let puntoNormal = productoVectorial(tangente,biNormal);
		let puntoNormal = productoVectorial(biNormal,tangente);
		return puntoNormal;
	}

}



function verticesA1()
{
	let puntosControl = [
	[0.0,-0.5,0.0],[0.0,-0.5,0.0],[0.25,-0.5,0.0],[0.25,-0.5,0.0],
	[0.25,-0.5,0.0],[0.25,-0.5,0.0],[0.25,-0.3,0.0],[0.25,-0.3,0.0],
	[0.25,-0.3,0.0],[0.25,-0.2,0.0],[0.15,-0.3,0.0],[0.15,-0.2,0.0],
	[0.15,-0.2,0.0],[0.2,-0.2,0.0],[0.2,0.2,0.0],[0.15,+0.2,0.0],
	[0.15,+0.2,0.0],[0.15,+0.3,0.0],[0.25,+0.2,0.0],[0.25,+0.3,0.0],
	[0.25,+0.3,0.0],[0.25,+0.3,0.0],[0.25,+0.5,0.0],[0.25,+0.5,0.0],
	[0.25,+0.5,0.0],[0.25,+0.5,0.0],[0.0,+0.5,0.0],[0.0,+0.5,0.0]

	];

	return puntosControl;
}

function verticesA2()
{
	let puntosControl = [
	[0.0,0.0,0.0],[0.25,0.0,0.0],[0.20,0.15,0.0],[0.15,0.20,0.0],
	[0.15,0.20,0.0],[0.15,0.25,0.0],[0.20,0.3,0.0],[0.18,0.32,0.0],
	[0.18,0.32,0.0],[0.16,0.325,0.0],[0.155,0.328,0.0],[0.15,0.33,0.0]

	];

	return puntosControl;
}

function verticesA3()
{
	let puntosControl = [
	[0.0,0.0,0.0],[0.0,0.0,0.0],[0.25,0.0,0.0],[0.25,0.0,0.0],
	[0.25,0.0,0.0],[0.25,0.0,0.0],[0.1,0.1,0.0],[0.1,0.1,0.0],
	[0.1,0.1,0.0],[0.1,0.1,0.0],[0.1,0.2,0.0],[0.1,0.2,0.0],
	[0.1,0.2,0.0],[0.25,0.1,0.0],[0.25,0.4,0.0],[0.15,0.6,0.0],
	[0.15,0.6,0.0],[0.10,0.62,0.0],[0.1,0.63,0.0],[0.08,0.65,0.0]

	
	];
	return puntosControl;
}
function verticesA4()
{
	let puntosControl = [
	[0.0,0.0,0.0],[0.0,0.0,0.0],[0.20,0.0,0.0],[0.20,0.0,0.0],
	[0.20,0.0,0.0],[0.30,0.0,0.0],[0.30,0.1,0.0],[0.20,0.1,0.0],
	[0.20,0.1,0.0],[0.15,0.1,0.0],[0.15,0.2,0.0],[0.16,0.2,0.0],
	[0.16,0.2,0.0],[0.16,0.22,0.0],[0.25,0.24,0.0],[0.30,0.3,0.0],
	[0.30,0.3,0.0],[0.20,0.3,0.0],[0.20,0.34,0.0],[0.20,0.38,0.0],
	[0.20,0.38,0.0],[0.20,0.44,0.0],[0.16,0.44,0.0],[0.05,0.44,0.0]
	];
	return puntosControl;
}

function verticesRueda()
{
	let puntosControl = [
	[0.0,-0.2,0.0],[0.0,-0.2,0.0],[0.4,-0.2,0.0],[0.4,-0.2,0.0],
	[0.4,-0.2,0.0],[0.45,-0.2,0.0],[0.5,-0.25,0.0],[0.5,-0.3,0.0],
	[0.5,-0.3,0.0],[0.5,-0.3,0.0],[0.6,-0.3,0.0],[0.6,-0.3,0.0],
	[0.6,-0.3,0.0],[0.6,-0.3,0.0],[0.6,0.3,0.0],[0.6,0.3,0.0],
	[0.6,0.3,0.0],[0.6,0.3,0.0],[0.5,0.3,0.0],[0.5,0.3,0.0],
	[0.5,0.3,0.0],[0.5,0.25,0.0],[0.45,0.2,0.0],[0.4,0.2,0.0],
	[0.4,0.2,0.0],[0.4,0.2,0.0],[0.0,0.2,0.0],[0.0,0.2,0.0]

];	
	return puntosControl;
}

function verticesBaseImpresora()
{
	let puntosControl = [
	[0.0,-0.2,0.0],[0.0,-0.2,0.0],[0.5,-0.2,0.0],[0.5,-0.2,0.0],
	[0.5,-0.2,0.0],[0.5,-0.2,0.0],[0.5,0.2,0.0],[0.5,0.2,0.0],
	[0.5,0.2,0.0],[0.48,0.2,0.0],[0.47,0.22,0.0],[0.45,0.24,0.0],
	[0.45,0.24,0.0],[0.45,0.24,0.0],[0.44,0.24,0.0],[0.44,0.24,0.0],
	[0.44,0.24,0.0],[0.44,0.22,0.0],[0.42,0.20,0.0],[0.42,0.20,0.0],
	[0.42,0.20,0.0],[0.42,0.20,0.0],[0.0,0.20,0.0],[0.0,0.20,0.0]
	];
	return puntosControl;

}

