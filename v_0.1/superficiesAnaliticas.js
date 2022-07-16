/*Contiene las parametrizaciones de superficies que 
son descriptas totalmente de manera analiticas mediante formulas*/

function Esfera(radio)
{
   this.getPosicion=function(u,v)
    {
        u = u*2*Math.PI;
        v = v  *Math.PI;
        let x = radio*(Math.cos(u)*Math.sin(v));
        let y = radio*(Math.sin(u)*Math.sin(v));
        let z = radio*Math.cos(v);
        return [x,y,z];
    }
    this.getNormal=function(u,v)
    {
        u = u * 2*Math.PI;
        v = v *Math.PI;

        let dux = -1*radio*Math.sin(u)*Math.sin(v);
        let duy = radio*Math.cos(u)*Math.sin(v);
        let duz = 0.0;

        let dvx = radio*Math.cos(u)*Math.cos(v);
        let dvy = radio*Math.sin(u)*Math.cos(v);
        let dvz = -1*radio*Math.sin(v);

        let normal = productoVectorial([dux,duy,duz],[dvx,dvy,dvz]);
        //NORMAL ESFERA  ESTA INVERTIDA ya que las utilizare como emisoras de luz..
        // caso contrario utlizar : return [-1*normal[0],-1*normal[1],-1*normal[2]];
        return normal;
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


