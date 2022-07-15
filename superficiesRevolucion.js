
function superficieRevolucion(radio,altura)
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
    this.getCoordenadasTextura=function(u,v,tramo,curvaGeometrica){
    	let largoCurva = curvaGeometrica.obtenerCantidadTramos();
        return [((u+tramo)/largoCurva),(v/360)];

    }	
}

/*Recorrido circular  analitico en el plano XZ
 de radio: r y parametro: t*/
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
		// 'y' versor
		let puntoBiNormal= [0.0,1.0,0.0];
		return puntoBiNormal;
	}

	this.getNormal= function(biNormal,tangente,t)
	{
		let puntoNormal = productoVectorial(biNormal,tangente);
		return puntoNormal;
	}

}

/*Vertices de formas 2D de revolucion*/
function verticesA1()
{
	let puntosControl = [
	[0.0,-0.5,0.0],[0.0,-0.5,0.0],[0.25,-0.5,0.0],[0.25,-0.5,0.0],
	[0.25,-0.5,0.0],[0.25,-0.5,0.0],[0.25,-0.3,0.0],[0.25,-0.3,0.0],
	[0.25,-0.3,0.0],[0.25,-0.2,0.0],[0.15,-0.3,0.0],[0.15,-0.2,0.0],
	[0.15,-0.2,0.0],[0.2,-0.2,0.0],[0.2,0.2,0.0],[0.15,+0.2,0.0],
	[0.15,+0.2,0.0],[0.15,+0.3,0.0],[0.25,+0.2,0.0],[0.25,+0.3,0.0],
	[0.25,+0.3,0.0],[0.25,+0.3,0.0],[0.25,+0.5,0.0],[0.25,+0.5,0.0],
	[0.25,+0.5,0.0],[0.25,+0.5,0.0],[0.0,+0.5,0.0],[0.0,+0.5,0.0]];
	return puntosControl;
}

function verticesA2()
{
	let puntosControl = [
	[0.0,-0.5,0.0],[0.4,-0.5,0.0],[0.4,-0.4,0.0],[0.15,0.0,0.0],
	[0.15,0.0,0.0],[0.1,0.1,0.0],[0.2,0.3,0.0],[0.25,0.4,0.0],
	[0.25,0.4,0.0],[0.25,0.5,0.0],[0.15,0.45,0.0],[0.15,0.5,0.0]];
	return puntosControl;
}

function verticesA3()
{
	let puntosControl = [
	[0.0,-0.5,0.0],[0.0,-0.5,0.0],[0.25,-0.5,0.0],[0.25,-0.5,0.0],
	[0.25,-0.5,0.0],[0.25,-0.5,0.0],[0.1,-0.4,0.0],[0.1,-0.4,0.0],
	[0.1,-0.4,0.0],[0.1,-0.4,0.0],[0.1,-0.3,0.0],[0.1,-0.3,0.0],
	[0.1,-0.3,0.0],[0.25,-0.25,0.0],[0.25,-0.15,0.0],[0.25,-0.05,0.0],
	[0.25,-0.05,0.0],[0.25,-0.05,0.0],[0.25,0.3,0.0],[0.25,0.3,0.0],
	[0.25,0.3,0.0],[0.25,0.4,0.0],[0.15,0.35,0.0],[0.15,0.4,0.0],];
	return puntosControl;
}
function verticesA4()
{
	let puntosControl = [
	[0.0,-0.5,0.0],[0.0,-0.5,0.0],[0.20,-0.5,0.0],[0.20,-0.5,0.0],
	[0.20,-0.5,0.0],[0.30,-0.5,0.0],[0.30,-0.3,0.0],[0.20,-0.3,0.0],
	[0.20,-0.3,0.0],[0.1,-0.1,0.0],[0.25,0.05,0.0],	[0.35,0.1,0.0],	
	[0.35,0.1,0.0],[0.30,0.12,0.0],[0.28,0.13,0.0],[0.25,0.15,0.0],
	[0.25,0.15,0.0],[0.12,0.2,0.0],[0.2,0.5,0.0],[0.0,0.5,0.0]];

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
	[0.4,0.2,0.0],[0.4,0.2,0.0],[0.0,0.2,0.0],[0.0,0.2,0.0]];	
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
	[0.42,0.20,0.0],[0.42,0.20,0.0],[0.0,0.20,0.0],[0.0,0.20,0.0]];
	return puntosControl;

}

