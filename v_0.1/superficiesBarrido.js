
/*Contiene los vertices y funciones de las superficies de barrido*/
function superficieBarrido(altura,uScale,vScale)
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
       
        return [-1*normal[0],-1*normal[1],-1*normal[2]];
    }

    this.getCoordenadasTextura=function(u,v,tramo,curvaGeometrica){
       
        return [((u+tramo)/uScale),v/vScale];
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

function verticesB1()
{
    let puntosControl = [[0.5,0.0,0.0],[0.5,0.0,0.0],[0.0,0.0,0.433],[0.0,0.0,0.433],
                         [0.0,0.0,0.433],[0.0,0.0,0.433],[-0.5,0.0,0.0],[-0.5,0.0,0.0],
                         [-0.5,0.0,0.0],[-0.5,0.0,0.0],[0.5,0.0,0.0],[0.5,0.0,0.0]
    ];
    return puntosControl;
}
function verticesB2()
{
    let puntosControl = [
    [-0.5,0.0,0.0],[-0.37588,0.0,-0.13681],[-0.34142,0.0,-0.20840],[-0.31194,0.0,-0.39076],
    [-0.31194,0.0,-0.39076],[- 0.12758,0.0,-0.37911],[ 0.089300,0.0,- 0.38990],[0.11077,0.0,-0.48757],
    [0.11077,0.0,-0.48757],[0.21668,0.0, -0.33623],[0.27887,0.0,-0.28676],[0.45016,0.0, -0.21762],
    [0.45016,0.0, -0.21762],[0.39802,0.0,- 0.039728],[ 0.39802,0.0,0.039728],[0.45092,0.0,0.21604],
    [0.45092,0.0,0.21604],[ 0.27987,0.0,0.28579],[ 0.21786,0.0, 0.33547],[ 0.11248,0.0,0.48719],
    [ 0.11248,0.0,0.48719],[-0.048748,0.0,0.39702],[-0.12626,0.0, 0.37955],[-0.31057,0.0,0.39185],
    [-0.31057,0.0,0.39185],[-0.34106,0.0, 0.20900],[-0.37564,0.0,0.13746],[-0.5,0.0,0.0]
    ];
    return puntosControl;

}
function verticesB3()
{
    let puntosControl = [
    [-0.1,0.0,-0.2],[-0.1,0.0,-0.2],[0.1,0.0,-0.2],[0.1,0.0,-0.2],
    [0.1,0.0,-0.2],[0.1,0.0,-0.2],[0.1,0.0,-0.5],[0.1,0.0,-0.5],
    [0.1,0.0,-0.5],[0.3,0.0,-0.5],[0.4,0.0,-0.4],[0.5,0.0,-0.1],
    [0.5,0.0,-0.1],[0.5,0.0,-0.1],[0.2,0.0,-0.1],[0.2,0.0,-0.1],
    [0.2,0.0,-0.1],[0.2,0.0,-0.1],[0.2,0.0,0.1],[0.2,0.0,0.1],
    [0.2,0.0,0.1],[0.2,0.0,0.1],[0.5,0.0,0.1],[0.5,0.0,0.1],
    [0.5,0.0,0.1],[0.5,0.0,0.4],[0.3,0.0,0.5],[0.1,0.0,0.5],
    [0.1,0.0,0.5],[0.1,0.0,0.5],[0.1,0.0,0.1],[0.1,0.0,0.1],
    [0.1,0.0,0.1],[0.1,0.0,0.1],[-0.1,0.0,0.1],[-0.1,0.0,0.1],
    [-0.1,0.0,0.1],[-0.1,0.0,0.1],[-0.1,0.0,0.5],[-0.1,0.0,0.5],
    [-0.1,0.0,0.5],[-0.3,0.0,0.5],[-0.5,0.0,0.4],[-0.5,0.0,0.1],
    [-0.5,0.0,0.1],[-0.5,0.0,0.1],[-0.1,0.0,0.1],[-0.1,0.0,0.1],
    [-0.1,0.0,0.1],[-0.1,0.0,0.1],[-0.1,0.0,-0.1],[-0.1,0.0,-0.1],
    [-0.1,0.0,-0.1],[-0.1,0.0,-0.1],[-0.5,0.0,-0.1],[-0.5,0.0,-0.1],
    [-0.5,0.0,-0.1],[-0.5,0.0,-0.4],[-0.3,0.0,-0.5],[-0.1,0.0,-0.5],
    [-0.1,0.0,-0.5],[-0.1,0.0,-0.5],[-0.1,0.0,-0.1],[-0.1,0.0,-0.1]


    ];
    return puntosControl;
}
function verticesB4()
{
    let puntosControl = [[0.3,0.0,-0.2],[0.3,0.0,-0.2],[0.3,0.0,0.2],[0.3,0.0,0.2],
                         [0.3,0.0,0.2],[0.3,0.0,0.6],[-0.3,0.0,0.6],[-0.3,0.0,0.2],
                         [-0.3,0.0,0.2],[-0.3,0.0,0.2],[-0.3,0.0,-0.2],[-0.3,0.0,-0.2],
                         [-0.3,0.0,-0.2],[-0.3,0.0,-0.6],[0.3,0.0,-0.6],[0.3,0.0,-0.2]];
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
function verticesAsiento()
{
    let puntosControl = [[-0.25,0.0,-0.5],[-0.25,0.0,-0.5],[0.25,0.0,-0.5],[0.25,0.0,-0.5],
                         [0.25,0.0,-0.5],[0.25,0.0,-0.5],[0.25,0.0,0.5],[0.25,0.0,0.5],
                         [0.25,0.0,0.5],[0.25,0.0,0.5],[0.0,0.0,0.5],[0.0,0.0,0.5],
                         [0.0,0.0,0.5],[0.0,0.0,0.5],[-0.25,0.0,-0.5],[-0.25,0.0,-0.5]
    ];
    return puntosControl;
}
function verticesTecho()
{
    let puntosControl = [[-0.5,0.0,0.0],[-0.25,0.0,0.35],[0.25,0.0,0.35],[0.5,0.0,0.0]
    ];
    return puntosControl;
}



/* Trayectoria Lineal eje Y UP*/
function recorridoLinealEjeY(t)
{
    this.getPosicion=function(t)
    {
        /* [x(t),y(t),z(t)]*/
        let punto = [0.0,t,0.0];
        return punto;
    }
    this.getTangente = function(t)
    {
        /* [dx(t)/dx, dy(t)/dy, dz(t)/dz]*/
        let puntoDer = [0.0,1.0,0.0];
        return puntoDer;
    }
    this.getNormal = function(t)
    {
        let puntoNormal = [1.0,0.0,0.0];
        return puntoNormal;
    }
    this.getBiNormal = function(normal,tangente,t)
    {
        let puntoBiNormal = productoVectorial(normal,tangente);
        return puntoBiNormal;
    }
}
