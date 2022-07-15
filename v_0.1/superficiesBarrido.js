
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
        normal.y = normal.y - altura/2;
        return normal;
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
    let puntosControl = [[0.5,0.0,0.0],[0.4,0.0,0.0],[0.249,0.0,0.313],[0.312,0.0,0.391],
    [0.31174,0.0,-0.39092],[0.24940,0.0,-0.31273],[0.39996221,0.0,0.00047627],[0.50022493,0.0,-0.00014691],
    [-0.11126,0.0,  -0.48746],[-0.089008,0.0,  -0.389971],[ 0.24974,0.0,  -0.31241],[0.31177,0.0,  -0.39118],
    [-0.45048,0.0,  -0.21694],[-0.36039,0.0,  -0.17355],[-0.088536,0.0,  -0.390040],[-0.11145,0.0,  -0.48765],
    [-0.45048,0.0,   0.21694],[-0.36039 ,0.0,  0.17355],[-0.36015,0.0,  -0.17397],[ -0.45075,0.0,  -0.21691],
    [-0.11126,0.0,   0.48746],[-0.089008,0.0,   0.389971],[-0.36056,0.0,   0.17311],[-0.45062,0.0,   0.21717],
    [ 0.31174,0.0,   0.39092],[0.24940,0.0,   0.31273],[-0.089464,0.0,   0.389828],[-0.11117,0.0,   0.48772],
    [ 0.31174,0.0,   0.39092],[0.24940 ,0.0,  0.31273],[-0.089464,0.0,   0.389828],[-0.11117,0.0 ,  0.48772]

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
