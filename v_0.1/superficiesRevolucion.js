function superficieRevolucion(altura)
{
	 this.getPosicion=function(u,curvaGeometrica,tramo)
    {
       
        let punto = curvaGeometrica.calcularPuntoCurva(u,tramo);
        return [punto.x,punto.y ,punto.z-altura/2,1];
    }
    this.getNormal=function(u,v,curvaGeometrica,curvaTrayectoria,tramo)
    {
        let tangenteTrayectoria = curvaTrayectoria.getTangente(v);
        let tangenteForma2D =  curvaGeometrica.calcularPuntoCurvaDerivada(u,tramo);
        let normal = productoVectorial(tangenteForma2D,tangenteTrayectoria);
        normal.z = normal.z - altura/2;
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
		let puntoNormal = productoVectorial(tangente,biNormal);
	}

}


function verticesA1()
{
	let puntosControl = [
	[0.5,-0.5,0.0],[0.5,-0.5,0.0],[0.5,0.5,0.0],[0.5,0.5,0.0]];
	return puntosControl;

}