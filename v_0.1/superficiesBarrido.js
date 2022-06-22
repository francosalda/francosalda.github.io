
//trayectoria lineal: aplica m*t +b al parametro 't' de la curva
function trayectoriaLineal(t,m,b)
{
    return t*m+b;

}





function paredTubo(radio,altura)
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
    this.getPosicion=function(u,v,curvaGeometrica)
    {
        if(u < 0.25)
        {
         puntosDeControl = verticesCuadrado(u);  
         var punto = curvaGeometrica.calcularPuntoCurva((4*u),puntosDeControl); 
            
        }
        else if ( u>= 0.25 && u < 0.5)
        {
            puntosDeControl = verticesCuadrado(u);
            var punto = curvaGeometrica.calcularPuntoCurva((4*u-1),puntosDeControl);    
            
        }
        else if(u >= 0.5 && u < 0.75)
        {
            puntosDeControl = verticesCuadrado(u);
            var punto = curvaGeometrica.calcularPuntoCurva((4*u-2),puntosDeControl);    

        }
        else if (u >= 0.75 && u < 1.1)
        {
            puntosDeControl = verticesCuadrado(u);
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
function verticesCuadrado(u)
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


function chasis(altura)
{
    this.getPosicion=function(u,v,curvaGeometrica)
    {
        if(u < 0.25)
        {
         puntosDeControl = verticesChasis(u);  
         //var punto = curvaGeometrica.calcularPuntoCurva(((10/3)*u),puntosDeControl);             
         var punto = curvaGeometrica.calcularPuntoCurva((4*u),puntosDeControl); 
        }
        else if(u >= 0.25 && u < 0.5) 
        {
         puntosDeControl = verticesChasis(u);  
         var punto = curvaGeometrica.calcularPuntoCurva((4*u-1),puntosDeControl);               
         
        }
        else if(u >= 0.5 && u < 0.75) 
        {
         puntosDeControl = verticesChasis(u);  
         var punto = curvaGeometrica.calcularPuntoCurva((4*u-2),puntosDeControl);           
        }
        else if (u >= 0.75 && u < 1.1)
        {
            puntosDeControl = verticesChasis(u);  
         var punto = curvaGeometrica.calcularPuntoCurva((4*u-3),puntosDeControl);              
        }


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

//devuelve los vertices de las curvas del chasis del auto elevador
function verticesChasis(u)
{
    if(u < 0.25)
    {
        v1 = [-0.25,0.0,-0.2]; v2 = [-0.15,0.0,-0.2];
        v3 = [0.15,0.0,-0.2]; v4 = [0.25,0.0,-0.2];
        //v1 = [-0.25,-0.2,0.0]; v2 = [-0.15,-0.2,0.0];
        //v3 = [0.15,-0.2,0.0]; v4 = [0.25,-0.2,0.0];

    }
    else if (u >= 0.25 && u < 0.5)
    {
        v1 = [0.25,0.0,-0.2];v2 = [0.5,0.0,-0.1];
        v3 = [0.5,0.0,0.1]; v4 = [0.25,0.0,0.2];

    }
    else if (u >= 0.5 && u < 0.75)
    {
        v1 = [0.25,0.0,0.2]; v2 = [0.15,0.0,0.2];
        v3 = [-0.15,0.0,0.2]; v4 = [-0.25,0.0,0.2];

    } 
    else if (u >= 0.75 && u < 1.1)
    {
        v1 = [-0.25,0.0,0.2]; v2=[-0.5,0.0,0.1];
        v3 = [-0.5,0.0,-0.1]; v4  = [-0.25,0.0,-0.2];
    }

    return [v1,v2,v3,v4];
}


function verticesTecho(u)
{
    let v1,v2,v3,v4;
    if(u < 0.5)
    {
        v1=[-1.0,0.0,-0.25]; v2=v1;
        v3=[1.0,0.0,-0,25];v4=v3;
    }
    else if (u>=0.5  && u < 1.1)
    {
        v1 = [1.0,0.0,-0,25]; v2 = [1.0,0.0,0.25];
        v3= [-1.0,0.0,0.25]; v4 = [-1.0,0.0,-0.25];
    }
    return [v1,v2,v3,v4];

}