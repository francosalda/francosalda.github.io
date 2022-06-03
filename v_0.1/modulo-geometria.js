

/*

    Tareas:
    ------

    1) Modificar a función "generarSuperficie" para que tenga en cuenta los parametros filas y columnas al llenar el indexBuffer
       Con esta modificación deberían poder generarse planos de N filas por M columnas (Ready)

    2) Modificar la funcion "dibujarMalla" para que use la primitiva "triangle_strip" (Ready)

    3) Crear nuevos tipos funciones constructoras de superficies

        3a) Crear la función constructora "Esfera" que reciba como parámetro el radio

        3b) Crear la función constructora "TuboSenoidal" que reciba como parámetro la amplitud de onda, longitud de onda, radio del tubo y altura.
        (Ver imagenes JPG adjuntas)
        
        
    Entrega:
    -------

    - Agregar una variable global que permita elegir facilmente que tipo de primitiva se desea visualizar [plano,esfera,tubosenoidal]
    
*/




var mallasDeTriangulos=[];
curva = new CurvaBezier(3);

var superficie3D;
var mallaDeTriangulos;
//indica la cantidad de  filas y columnas de vertices

var filas=40; // indica que hay 'filas+1' filas de vertices
var columnas=40; // indica que hay 'columnas+1' columnas de vertices
var mallaDeTriangulos2;
var mallaDeTriangulos1;
var figura_a_dibujar = "planoyesfera";//variable global para elegir la figura a crear
console.log("Para cambiar la figura a dibujar edite la variable: figura_a_dibujar = plano o esfera o tubosenoidal ");




function crearGeometria(){
    // Dibujado del Auto-elevador
    


    function dibujar_rueda()
    {



    }

        
    if(figura_a_dibujar == "esfera")
    {
      superficie3D=new Esfera(1); // esfera de radio 1  
    }
    else if (figura_a_dibujar == "plano")
    {
      superficie3D=new Plano(3,3); // plano de 3x3  

    }
    else if (figura_a_dibujar == "tubosenoidal") 
    {
        superficie3D=new TuboSenoidal(1,2,0.15,0.5); // tubo senoidal de R:1, Altura:2, Amplitud:0.15 , Periodo:0.5
    }
    else if(figura_a_dibujar == "planoyesfera")
    {
       /* superficie3D=new Plano(3,3); // plano de 3x3  
         mallasDeTriangulos[0] = generarSuperficie(superficie3D,filas,columnas);
        superficie3D=new Esfera(1); // esfera de radio 1
        mallasDeTriangulos[1] = generarSuperficie(superficie3D,filas,columnas);  */

        rueda = new objeto3D();
        rueda.asignarTipoDeSuperficie("plano");
        rueda.asignarMallaDeTriangulos();


    }
    else
    {

        superficie3D=new Esfera(1); // esfera de radio 1    
    }
    

    //mallaDeTriangulos=generarSuperficie(superficie3D,filas,columnas);
    
    
    
    
    
}

function dibujarGeometria(){

    //dibujarMalla(rueda.obtenerMallaDeTriangulos);
   // dibujarMalla(mallasDeTriangulos[1]);
     
}


function TuboSenoidal(radio,altura,amplitudOnda,longitudOnda)
{
    this.getPosicion=function(u,v){   
        var x = radio*Math.cos(u*2*Math.PI);
        var z = radio *Math.sin(u*2*Math.PI);
        x= x+x *amplitudOnda*Math.sin(((2*Math.PI)/longitudOnda)*v*altura);
        z =z+ z *amplitudOnda*Math.sin(((2*Math.PI)/longitudOnda)*v*altura);
        return [x,v*altura,z];
    }

    this.getNormal=function(u,v){
        return [0,1,0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }

}

function Esfera(radio)
{
    this.getPosicion=function(u,v)
    {
        u = u *2*Math.PI;
        v = v *Math.PI;

        var x = radio*((Math.cos(u))*(Math.sin(v)));
        var y = radio*((Math.sin(u))*(Math.sin(v)));
        var z = radio*(Math.cos(v));

        //Parametrización alternativa en des-uso
        //var x = radio*((Math.cos(u))*(Math.cos(v)));
        //var y = radio*((Math.sin(u))*(Math.cos(v)));
        //var z = radio*(Math.sin(v));
        return [x,y,z];
    }
    this.getNormal=function(u,v){
 
        u = u * 2*Math.PI;
        v = v * 2*Math.PI;
        //calculo del vector normal a la superficie
        var nx = Math.pow(radio,2)*Math.cos(v)*Math.cos(u)*Math.cos(v);
        var ny = Math.pow(radio,2)*Math.cos(v)*Math.sin(u)*Math.cos(v);
        var nz = Math.pow(radio,2)*Math.cos(v)*Math.sin(v);
        var norma = Math.sqrt(Math.pow(nx,2)+Math.pow(ny, 2)+Math.pow(nz,2));

        return [nx/norma,ny/norma,nz/norma];
    }

    this.getCoordenadasTextura=function(u,v){
        
        return [u,v];
        
    }

}
function Plano(ancho,largo){

    
    this.getPosicion=function(u,v){

    

        var x=(u-0.5)*ancho;
        var z=(v-0.5)*largo;
        return [x,0,z];
    }

    this.getNormal=function(u,v){
        return [0,1,0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function Tubo(radio,altura)
{
    this.getPosicion=function(u,v){
        u = u *2*Math.PI;
        var x= radio * Math.cos(u);
        var z = radio * Math.sin(u);
        return [x,v*altura,z];
    }
     this.getNormal=function(u,v){
        return [0,1,0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }

}






function generarSuperficie(superficie,filas,columnas){
    
    positionBuffer = [];
    normalBuffer = [];
    uvBuffer = [];
    var contador = 0;

    for (var i=0; i <= filas; i++) {
        for (var j=0; j <= columnas; j++) {


            var u=j/columnas;
            var v=i/filas;

            var pos=superficie.getPosicion(u,v);

            positionBuffer.push(pos[0]);
            positionBuffer.push(pos[1]);
            positionBuffer.push(pos[2]);


            var nrm=superficie.getNormal(u,v);

            normalBuffer.push(nrm[0]);
            normalBuffer.push(nrm[1]);
            normalBuffer.push(nrm[2]);

            var uvs=superficie.getCoordenadasTextura(u,v);

            uvBuffer.push(uvs[0]);
            uvBuffer.push(uvs[1]);
             contador++;

        }
    }

    //[DEBUG]:
    console.log('Información para debug');
    console.log('El position buffer tiene un largo de :',positionBuffer.length,'elementos');
    console.log('Es equivalente a la info XYZ de: ',positionBuffer.length/3,' vertices');
    
    //Creo el Buffer de indices de los triángulos
    indexBuffer = [];
    var indice = 0;
    var cantidad_columnas = columnas+1;
    for(i=0 ; i< filas;i++)
    {
        for(j=0; j < columnas;j++)
        {
            //si se trata del primer quad entonces necesito 4 vertices para representar la columna actual
           if(j == 0)
           {
                //si estoy comenzado una fila nueva,debo repetir vertices en el 1er quad para mecanismo de nueva fila de triangle_strip
                if(i > 0)
                {
                    indexBuffer[indice] = indexBuffer[indice-1];indice++;
                    indexBuffer[indice++] = cantidad_columnas*i +j;             
                }
                indexBuffer[indice++] = cantidad_columnas*i +j;   
                indexBuffer[indice++] = cantidad_columnas*(i+1) + j; 
                indexBuffer[indice++] = cantidad_columnas*(i)+(j+1);
                indexBuffer[indice++] = cantidad_columnas*(i+1)+(j+1); 
              
           }
           else
           {
           // si no es el primer quad, entonces solo debo agregar 2 vertices para  representar la columna actual   
                indexBuffer[indice++] = cantidad_columnas*(i)+(j+1);
                indexBuffer[indice++] = cantidad_columnas*(i+1)+(j+1);
            }

        }
        
    }

            //[DEBUG]
            console.log('IndexBuffer para TRIANGLE_STRIP:')
            console.log(indexBuffer);


    // Creación e Inicialización de los buffers

    webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionBuffer), gl.STATIC_DRAW);
    webgl_position_buffer.itemSize = 3;
    webgl_position_buffer.numItems = positionBuffer.length / 3;

    webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalBuffer), gl.STATIC_DRAW);
    webgl_normal_buffer.itemSize = 3;
    webgl_normal_buffer.numItems = normalBuffer.length / 3;

    webgl_uvs_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvBuffer), gl.STATIC_DRAW);
    webgl_uvs_buffer.itemSize = 2;
    webgl_uvs_buffer.numItems = uvBuffer.length / 2;


    webgl_index_buffer = gl.createBuffer();
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

function dibujarMalla(mallaDeTriangulos){
    
    // Se configuran los buffers que alimentaron el pipeline
    gl.bindBuffer(gl.ARRAY_BUFFER, mallaDeTriangulos.webgl_position_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mallaDeTriangulos.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, mallaDeTriangulos.webgl_uvs_buffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, mallaDeTriangulos.webgl_uvs_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, mallaDeTriangulos.webgl_normal_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, mallaDeTriangulos.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);
       
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mallaDeTriangulos.webgl_index_buffer);


    if (modo!="wireframe"){
        gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));                    
        /*
            Aqui es necesario modificar la primitiva por triangle_strip
        */
          gl.drawElements(gl.TRIANGLE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
      //  gl.drawElements(gl.TRIANGLES, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    
    if (modo!="smooth") {
        gl.uniform1i(shaderProgram.useLightingUniform,false);
        gl.drawElements(gl.LINE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
 
}

