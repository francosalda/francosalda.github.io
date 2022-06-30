
//trayectoria lineal: aplica m*t +b al parametro 't' de la curva
function trayectoriaLineal(t,m,b)
{
    return t*m+b;

}





function paredCilindro(radio,altura)
{
    this.getPosicion=function(u,v){   
        var x = radio*Math.cos(u*2*Math.PI);
        var z = radio *Math.sin(u*2*Math.PI);

        v = v-altura/2; //para posicionar el centro de masa en el origen
        return [x,v*altura,z];
    }
    // DEBUG calcular normal
    this.getNormal=function(u,v){
        return [0,1,0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }

}
function paredCubo(altura)
{
    // el parametro 'u' recorre la forma geometrica de la figura
    //el parametro 'v' recorre la curva de trayectoria de extrusion
    this.getPosicion=function(u,v,curvaGeometrica,tramo)
    {
        let punto = curvaGeometrica.calcularPuntoCurva(u,tramo); 
        v = v-altura/2; //para posicionar el centro de masa en el origen
        return [punto.x,punto.y+v,punto.z];
    }

    this.getNormal=function(u,v){
        return [0,1,0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
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







function chasis(altura)
{
    this.getPosicion=function(u,v,curvaGeometrica,tramo)
    {
       
        let punto = curvaGeometrica.calcularPuntoCurva(u,tramo);
        v = v-altura/2; //para posicionar el centro de masa en el origen
        return [punto.x,punto.y+v,punto.z];

    }
    this.getNormal=function(u,v){
        return [0,1,0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [0.5,0.9];
    }
}
function verticesChasis()
{
    let puntosControl = [[-0.25,0.0,-0.2],[-0.15,0.0,-0.2],[0.15,0.0,-0.2],[0.25,0.0,-0.2],
                            [0.25,0.0,-0.2],[0.5,0.0,-0.1],[0.5,0.0,0.1],[0.25,0.0,0.2],
                            [0.25,0.0,0.2],[0.15,0.0,0.2],[-0.15,0.0,0.2],[-0.25,0.0,0.2],
                            [-0.25,0.0,0.2],[-0.5,0.0,0.1],[-0.5,0.0,-0.1],[-0.25,0.0,-0.2]];
    return puntosControl;
}




