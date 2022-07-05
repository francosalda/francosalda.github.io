
/*Contiene los vertices y funciones de las superficies de barrido*/

function paredCubo(altura)
{
    // el parametro 'u' recorre la curva geometrica de la forma 2D de extrusion
    this.getPosicion=function(u,curvaGeometrica,tramo)
    {
        let punto = curvaGeometrica.calcularPuntoCurva(u,tramo); 
        return [punto.x,punto.y-altura/2,punto.z,1.0];
    }

    // el parametro 'v' barre  la curva de trayectoria de extrusion, el 'u' la forma geometrica 2D 
    this.getNormal=function(u,v,curvaGeometrica,curvaTrayectoria,tramo)
    {
        let tangenteTrayectoria = curvaTrayectoria.getTangente(v);
        let tangenteForma2D =  curvaGeometrica.calcularPuntoCurvaDerivada(u,tramo);
        let normal = productoVectorial(tangenteForma2D,tangenteTrayectoria);
       /* let puntoDer = curvaGeometrica.calcularPuntoCurvaDerivada(u,tramo);
        var modulo=Math.sqrt(puntoDer.x*puntoDer.x+puntoDer.y*puntoDer.y+puntoDer.z+puntoDer.z);
        //vector normal
        puntoDer.x=puntoDer.x/modulo;puntoDer.y=puntoDer.y/modulo;puntoDer.z=puntoDer.z/modulo;
        let normal = [puntoDer.x,-puntoDer.y,puntoDer.z];*/
        normal.y = normal.y - altura/2;
        return normal;
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }

}
function chasis(altura)
{
    this.getPosicion=function(u,curvaGeometrica,tramo)
    {
       
        let punto = curvaGeometrica.calcularPuntoCurva(u,tramo);
        return [punto.x,punto.y-altura/2 ,punto.z,1];
    }
    this.getNormal=function(u,v,curvaGeometrica,curvaTrayectoria,tramo)
    {
        let tangenteTrayectoria = curvaTrayectoria.getTangente(v);
        let tangenteForma2D =  curvaGeometrica.calcularPuntoCurvaDerivada(u,tramo);
        let normal = productoVectorial(tangenteForma2D,tangenteTrayectoria);
        normal.y = normal.y - altura/2;
        return normal;
    }

    this.getCoordenadasTextura=function(u,v){
        return [0.5,0.9];
    }
}


/* Vertices de las curvas de bezier de figuras geometricas */
function verticesCuadrado()
{
    let puntosControl = [[0.5,0.0,0.5],[0.25,0.0,0.5],[-0.25,0.0,0.5],[-0.5,0.0,0.5],
                        [-0.5,0.0,0.5],[-0.5,0.0,0.25],[-0.5,0.0,-0.25],[-0.5,0.0,-0.5],
                        [-0.5,0.0,-0.5],[-0.25,0.0,-0.5],[0.25,0.0,-0.5],[0.5,0.0,-0.5],
                        [0.5,0.0,-0.5],[0.5,0.0,-0.25],[0.5,0.0,0.25],[0.5,0.0,0.5]];
    return puntosControl;
}
function verticesChasis()
{
    let puntosControl = [[-0.25,0.0,-0.2],[-0.15,0.0,-0.2],[0.15,0.0,-0.2],[0.25,0.0,-0.2],
                        [0.25,0.0,-0.2],[0.5,0.0,-0.1],[0.5,0.0,0.1],[0.25,0.0,0.2],
                        [0.25,0.0,0.2],[0.15,0.0,0.2],[-0.15,0.0,0.2],[-0.25,0.0,0.2],
                        [-0.25,0.0,0.2],[-0.5,0.0,0.1],[-0.5,0.0,-0.1],[-0.25,0.0,-0.2]];
    return puntosControl;
}


//trayectoria lineal: aplica m*t +b al parametro 't' de la curva
function trayectoriaLineal(t,m,b)
{
    return t*m+b;

}