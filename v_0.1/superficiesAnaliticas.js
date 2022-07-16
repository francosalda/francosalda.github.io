/*Contiene las parametrizaciones de superficies que 
son descriptas totalmente de manera analiticas mediante formulas*/

function Esfera(radio)
{
    this.getPosicion=function(u,v)
    {
        u = u *2*Math.PI;
        v = v  *Math.PI;
        var x = radio*((Math.cos(u))*(Math.sin(v)));
        var y = radio*((Math.sin(u))*(Math.sin(v)));
        var z = radio*(Math.cos(v));
        return [x,y,z];
    }
    this.getNormal=function(u,v)
    {
        u = u * 2*Math.PI;
        v = v *Math.PI;
        //calculo del vector normal a la superficie
        var nx = Math.pow(radio,2)*Math.cos(v)*Math.cos(u)*Math.cos(v);
        var ny = Math.pow(radio,2)*Math.cos(v)*Math.sin(u)*Math.cos(v);
        var nz = Math.pow(radio,2)*Math.cos(v)*Math.sin(v);
        var norma = Math.sqrt(Math.pow(nx,2)+Math.pow(ny, 2)+Math.pow(nz,2));
        return [nx/norma,ny/norma,nz/norma];
    }

    this.getCoordenadasTextura=function(u,v)
    {
        return [u,v];    
    }

}

function Plano(ancho,largo)
{
    this.getPosicion=function(u,v)
    {
        var x=(u-0.5)*ancho;
        var z=(v-0.5)*largo;
        return [x,0,z];
    }
    this.getNormal=function(u,v)
    {
        return [0,1,0];
    }
    this.getCoordenadasTextura=function(u,v){
        return [u*ancho*5,v*largo*5];
    }
}

function paredCilindro(radio,altura)
{
    this.getPosicion=function(u,v)
    {   
        var x = radio*Math.cos(u*2*Math.PI);
        var z = radio *Math.sin(u*2*Math.PI);
        v = v-altura/2; //para posicionar el centro de masa en el origen
        return [x,v*altura,z];
    }
    this.getNormal=function(u,v)
    {
        return [0,1,0];
    }
    this.getCoordenadasTextura=function(u,v)
    {
        return [u,v];
    }
}


