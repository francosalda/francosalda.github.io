
function generarSuperficie3dBarrido(superficie)
{
    this.positionBuffer = [];
    this.normalBuffer = [];
    this.uvBuffer = [];

    //llenado de los vertices
    

    for(let i = 0 ; i <= 1 ; i++  ) //niveles {0 y 1}
    {
        var v1 = [0.5,0.0+i,0.5];
        var v2 = [-0.5,0.0+i,0.5];
        var v3 = [-0.5,0.0+i,-0.5];
        var v4 = [0.5,0.0+i,-0.5];
        //debug corregir
        var nrm=[1.0,1.0,1.0];
        var uvs = [1.0,1.0];

        this.positionBuffer.push(v1[0]);
        this.positionBuffer.push(v1[1]);
        this.positionBuffer.push(v1[2]);
        this.normalBuffer.push(nrm[0]);
        this.normalBuffer.push(nrm[1]);
        this.normalBuffer.push(nrm[2]);
        this.uvBuffer.push(uvs[0]);
        this.uvBuffer.push(uvs[1]);

        this.positionBuffer.push(v2[0]);
        this.positionBuffer.push(v2[1]);
        this.positionBuffer.push(v2[2]);
        this.normalBuffer.push(nrm[0]);
        this.normalBuffer.push(nrm[1]);
        this.normalBuffer.push(nrm[2]);
        this.uvBuffer.push(uvs[0]);
        this.uvBuffer.push(uvs[1]);

        this.positionBuffer.push(v3[0]);
        this.positionBuffer.push(v3[1]);
        this.positionBuffer.push(v3[2]);
        this.normalBuffer.push(nrm[0]);
        this.normalBuffer.push(nrm[1]);
        this.normalBuffer.push(nrm[2]);
        this.uvBuffer.push(uvs[0]);
        this.uvBuffer.push(uvs[1]);

        this.positionBuffer.push(v4[0]);
        this.positionBuffer.push(v4[1]);
        this.positionBuffer.push(v4[2]);
        this.normalBuffer.push(nrm[0]);
        this.normalBuffer.push(nrm[1]);
        this.normalBuffer.push(nrm[2]);
        this.uvBuffer.push(uvs[0]);
        this.uvBuffer.push(uvs[1]);





    }



    //Creo el Buffer de indices de los triángulos
    var indexBuffer = [];
    var indice = 0;
    //asginacion de los indexbuffers
    indexBuffer[indice++]=0;
    indexBuffer[indice++]=4;
    indexBuffer[indice++]=1;
    indexBuffer[indice++]=5;
    indexBuffer[indice++]=2;
    indexBuffer[indice++]=6;
    indexBuffer[indice++]=3;
    indexBuffer[indice++]=7;
    indexBuffer[indice++]=0;
    indexBuffer[indice++]=4;





    // Creación e Inicialización de los buffers

   var webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positionBuffer), gl.STATIC_DRAW);
    webgl_position_buffer.itemSize = 3;
     webgl_position_buffer.numItems = this.positionBuffer.length / 3;

    var webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalBuffer), gl.STATIC_DRAW);
     webgl_normal_buffer.itemSize = 3;
     webgl_normal_buffer.numItems = this.normalBuffer.length / 3;

    var webgl_uvs_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uvBuffer), gl.STATIC_DRAW);
     webgl_uvs_buffer.itemSize = 2;
     webgl_uvs_buffer.numItems = this.uvBuffer.length / 2;


    var webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);
     webgl_index_buffer.itemSize = 1;
     webgl_index_buffer.numItems = indexBuffer.length;


     return {
        webgl_position_buffer,
        webgl_normal_buffer,
        webgl_uvs_buffer,
        webgl_index_buffer
    }

}

function paredCubo()
{

	this.getVerticesForma=function(nivel)
    {
    var v1 = [0.5,0.0,0.0+nivel];
    var v2 = [0.0,0.5,0.0+nivel];
    var v3 = [-0.5,0.0,0.0+nivel];
    var v4 = [0.0,-0.5,0.0+nivel];
    return {v1,v2,v3,v4};
        //return cuadrado();

    }
    //debug recalcular
    this.getNormal=function(u,v){
 
       
        //debug editar
        return [1,1,1];
}
	this.getCoordenadasTextura=function(u,v){
       //debug editar 
        return [u,v];
        
    }


}

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

        

        
        return [punto.x,punto.y+v,punto.z];


        //var posXZ = CurvaCuadrado(u); 
        
        //y = -altura/2;// para que el centro vertical de la figura sea el origen.
        //console.log([posXZ[0],y+v*altura,posXZ[1]]) ;

        //return [posXZ[0],y+v*altura,posXZ[1]];
    }

    this.getNormal=function(u,v){
        return [0,1,0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }

}
//curvas de figuras geometricas
function CurvaCuadrado(v)
{
    var x,z;


    if(v <= 0.25)
    {
        x= 0.5 -v*2;
        z = 0.5;
    }
    else if (  v <= 0.5)
    {
        v = v -0.25;
     x = -0.5;
     z = 0.5-v*2;   
    }
    else if (v <= 0.75)
    {
        v = v - 0.5;
        z = -0.5;
        x = -0.5+v*2;
    }
    else if (v <= 1.1)
    {
        v = v-0.75;
        
        x = -0.5;
        z = -0.5+v*2;
    }


    return [x,z];      

}


//devuelve las coordenadas de un cubo de 1x1 en 2D
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

   
   
	/*var  v1 = [0.5,0.0,0.5];
    var v2 = [-0.5,0.0,0.5];
    var v3 = [-0.5,0.0,-0.5];
    var v4 = [0.5,0.0,-0.5];*/

	return [v1,v2,v3,v4];
}