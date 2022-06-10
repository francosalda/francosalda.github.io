
//trayectoria lineal: aplica m*t +b al parametro 't' de la curva
function trayectoriaLineal(t,m,b)
{
    return t*m+b;

}


function paredCubo(altura)
{
    // el parametro 'u' recorre la forma geometrica de la figura
    //el parametro 'v' recorre la curva de trayectoria de extrusion
    this.getPosicion=function(u,v,curvaGeometrica)
    {
        if(u < 0.25)
        {
         puntosDeControl = cuadrado(u);  
         var punto = curvaGeometrica.calcularPuntoCurva((4*u),puntosDeControl); 
            
        }
        else if ( u>= 0.25 && u < 0.5)
        {
            puntosDeControl = cuadrado(u);
            var punto = curvaGeometrica.calcularPuntoCurva((4*u-1),puntosDeControl);    
            
        }
        else if(u >= 0.5 && u < 0.75)
        {
            puntosDeControl = cuadrado(u);
            var punto = curvaGeometrica.calcularPuntoCurva((4*u-2),puntosDeControl);    

        }
        else if (u >= 0.75 && u < 1.1)
        {
            puntosDeControl = cuadrado(u);
            var punto = curvaGeometrica.calcularPuntoCurva((4*u-3),puntosDeControl);    
        }

        // v pertenece de 0 a 1
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


//vertices de curvas de bezier de figuras geometricas
function cuadrado(u)
{
    var v1,v2,v3,v4;
    
    if(u < 0.25)
    {
        v1 = [0.5,0.0,0.5];v2=v1;
        v3 = [-0.5,0.0,0.5]; v4=v3;
    }
    else if (u >= 0.25 &&  u< 0.5)
    {
        v1 = [-0.5,0.0,0.5]; v2=v1;
        v3= [-0.5,0.0,-0.5]; v4 = v3;

    }
    else if (u >= 0.5 && u < 0.75)
    {
        v1=  [-0.5,0.0,-0.5]; v2 = v1;
        v3 = [0.5,0.0,-0.5]; v4=v3;

    }
    else if (u >= 0.75 && u <1.1)
    {
        v1 = [0.5,0.0,-0.5]; v2=v1;
        v3 = [0.5,0.0,0.5];v4=v3;

    }

	return [v1,v2,v3,v4];
}