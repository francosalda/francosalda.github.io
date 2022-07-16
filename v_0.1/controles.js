

/*control de la camara*/
var previousClientX = 0;
var previousClientY = 0;
var radio = 2.5;
var alfa = 0;
var beta = Math.PI/4;
var factorVelocidad = 0.005;


var minimunBeta = 5 * Math.PI/180;
var maximiumBeta = 85* Math.PI/180;

var deltaXOffset = 0.0;
var deltaYOffset = 0.0;
var deltaZOffset = 0.0;
var deltaAlfa = 0.0;
var isMouseDown = false;
var actualEvent;

var mouse = {x: 0, y: 0};
var tipoCamaraActual = "orbital";


    function AutoElevadorControl(initialPos)
    {
        let vec3=glMatrix.vec3;          // defino vec3 para no tener que escribir glMatrix.vec3
        let mat4=glMatrix.mat4;
        
        let MIN_Y=1;
        let MIN_X = -4.5;
        let MAX_X =  4.7;
        let MIN_Z = -2.5;
        let MAX_Z = 2.5;
        let DELTA_TRASLACION=0.03;        // velocidad de traslacion 
        let DELTA_ROTACION=0.02;         // velocidad de rotacion
        let DELTA_MOVIMIENTO_PALA = 0.002; 
        let FACTOR_INERCIA=0.05;





        //camaras que siguen al autoelevador
        var posicionCamaraLateral = vec3.fromValues(0.0,1.0,1.5);
        var posicionCamaraConductor = vec3.fromValues(-0.2,0.8,0.0);
        var posicionTargetConductor = vec3.fromValues(1.5,1.0,0.0);
        var posicionCamaraTrasera = vec3.fromValues(-1.5,1.4,0.0);    
        

        if (!initialPos) initialPos=[0,0,0];

        let position=vec3.fromValues(initialPos[0],initialPos[1],initialPos[2]);
        
        let rotation=vec3.create();

        let rotationMatrix=mat4.create();       

        let worldMatrix=mat4.create();

        let vehicleInitialState={
            xVel:0,
            zVel:0,
            yVel:0,
            xVelTarget:0,
            zVelTarget:0,
            yVelTarget:0,
            yVelPala:0,
          


            yRotVelTarget:0,
            yRotVel:0,
            zRotVelTarget:0,
            zRotVel:0,
            xRotVelTarget:0,
            xRotVel:0,
            
            rightAxisMode:"move"
        }

        let vehicleState=Object.assign({},vehicleInitialState);


        
             /*Eventos del Mouse*/
            document.addEventListener('mousemove', function(e)
            {

            if(tipoCamaraActual == "orbital")
            {
                

               mouse.x = e.clientX || e.pageX; 
               mouse.y = e.clientY || e.pageY ;
               var deltaX=0;
               var deltaY=0;


                if (previousClientX) deltaX = mouse.x - previousClientX;
                if (previousClientY) deltaY = mouse.y - previousClientY;

                previousClientX = mouse.x;
                previousClientY = mouse.y;

                alfa = alfa + deltaX * factorVelocidad;
                beta = beta + deltaY * factorVelocidad;

                if (beta< minimunBeta ) {beta=minimunBeta};


                if (beta>maximiumBeta){beta=maximiumBeta};
               
               posicionEyeCamara = vec3.fromValues(deltaXOffset+radio * Math.sin(alfa+deltaAlfa) * Math.sin(beta),deltaYOffset+ radio * Math.cos(beta) ,deltaZOffset+radio * Math.cos(alfa+deltaAlfa) * Math.sin(beta) );
        }    
        });

        
        
         document.addEventListener('mousedown', function(e)
         {
            isMouseDown = true;
         });
         document.addEventListener('mouseup', function(e)
         {
            isMouseDown = false;
         });




        document.addEventListener("keydown",function(e){
            switch ( e.key ) {

                //avanzar
                case "ArrowUp": case"w":
                    vehicleState.xVelTarget=DELTA_TRASLACION;
                 break;
                

            
                //retroceder
                case "ArrowDown": case"s":

                    vehicleState.xVelTarget=-DELTA_TRASLACION;

                break;
                //girar sobre el eje 'y' horario
                case "d": case "ArrowRight":
                    vehicleState.yRotVelTarget=DELTA_ROTACION;
                break;
                //girar sobre el eje 'y' antihorario
                case "a":  case "ArrowLeft":
                    vehicleState.yRotVelTarget=-DELTA_ROTACION;
                break;
                //subir pala del elevador
                case "q": 
                vehicleState.yVelPala = +DELTA_MOVIMIENTO_PALA;
                    break;
                //bajar pala del elevador
                case "e":
                vehicleState.yVelPala = - DELTA_MOVIMIENTO_PALA;
                    break;
                //agarrar objeto con el elevador
                case "g":
                    if(vehicleState.sujentadoObjeto)
                    {
                        autoElevador.quitarUltimoHijo();
                        objetoEnEspera = false; // ya se puede imprimir otro objeto nuevo
                        vehicleState.sujentadoObjeto = false;
                    }
                    else
                    {
                        if(!imprimiendo && objetoEnEspera) // evita que se tome un objeto en proceso de impresio
                        {
                            vehicleState.sujentadoObjeto = true;
                            autoElevador.agregarHijo(objetoImpreso);

                        }   
                        
                    }
                break;

                //control de camaras
                case "1":
                    console.log("[Debug] Cámara orbital general: apunta al centro de la escena");
                    posicionEyeCamara = vec3.fromValues(0.0,1.0,2.0);

                    deltaXOffset = 0.0;
                    deltaYOffset = 0.0;
                    deltaZOffset = 0.0;
                    radio = 2.5;
                    posicionCenterCamara  = vec3.fromValues(0.0,0.0,0.0);
                    tipoCamaraActual = "orbital";
                break;
                case "2":
                    console.log("[Debug]  Cámara orbital impresora: su objetivo esta centrado en la impresora");
                    tipoCamaraActual = "orbital";
                    
                    deltaXOffset = 1.7;
                    deltaYOffset = 0.0;
                    deltaZOffset = 0.0;
                    radio = 1.5;
                    posicionCenterCamara = vec3.fromValues(1.7,0.3,0.0);
                    posicionEyeCamara = vec3.fromValues(1.7,1.0,1.0);
                break;
                case "3":
                    console.log("[Debug] Cámara orbital estantería: su objetivo está centrado en la estantería");
                    tipoCamaraActual = "orbital";
                    
                    deltaXOffset = -3.5;
                    deltaYOffset = 0.0;
                    deltaZOffset = 0.0;
                    radio = 2.5;
                    posicionEyeCamara = vec3.fromValues(-3.5,1.0,2.5);
                    posicionCenterCamara = vec3.fromValues(-3.5,0.0,0.0);
                break;
                case "4":
                    console.log("[Debug] Cámara de conductor: muestra la vista hacia adelante que tendría el conductor del autoelevador");
                     tipoCamaraActual = "firstPerson4";
                    beta = Math.PI/4;
                    radio = 1.5;
                    posicionCenterCamara = posicionTargetConductor;
                    posicionEyeCamara = posicionCamaraConductor;

                break;
                case "5":
                    console.log("[Debug] Cámara de seguimiento auto elevador trasera: sigue al vehículo desde atrás");
                    tipoCamaraActual = "firstPerson5";
                    beta = Math.PI/3;
                    radio = 1.5;
                    posicionCenterCamara = position;
                    posicionEyeCamara = posicionCamaraTrasera;

                break;
                case "6":
                    console.log("[Debug] Cámara de seguimiento auto elevador lateral: sigue al vehículo de costado");
                    tipoCamaraActual = "firstPerson6";
                    beta = Math.PI/4;
                    radio = 1.5;
                    posicionCenterCamara = position;
                    
                    posicionEyeCamara = posicionCamaraLateral;
                    
                break;
                case "o":
                radio = radio-0.1;
                if (radio < 0.1) radio = 0.1;
                posicionEyeCamara = vec3.fromValues(deltaXOffset+radio * Math.sin(alfa+deltaAlfa) * Math.sin(beta),deltaYOffset+ radio * Math.cos(beta) ,deltaZOffset+radio * Math.cos(alfa+deltaAlfa) * Math.sin(beta) );
                break;
                case "p":
                radio = radio+0.1;
                if (radio > 2.5) radio = 2.5;
                posicionEyeCamara = vec3.fromValues(deltaXOffset+radio * Math.sin(alfa+deltaAlfa) * Math.sin(beta),deltaYOffset+ radio * Math.cos(beta) ,deltaZOffset+radio * Math.cos(alfa+deltaAlfa) * Math.sin(beta) );
                break;

               
            }               

        });

        document.addEventListener("keyup",function(e){

            switch ( e.key ) 
            {
                case "ArrowUp":  case "w":
                    vehicleState.xVelTarget=0; break;
                
                case "ArrowDown": case "s": 
                    vehicleState.xVelTarget=0; break; 
  
                case "ArrowLeft" :case "a": 
                    vehicleState.yRotVelTarget=0; break;
                case "ArrowRight": case "d": 
                    vehicleState.yRotVelTarget=0; break;
                case "q": 
                    vehicleState.yVelPala = 0.0; 
                    break;
                case "e":
                    vehicleState.yVelPala = 0.0;
                break;
                    
                                              
          
            }                 
            
        });
        

        this.update=function()
        {
            
            //limites de la escena
            if(position[0] > MAX_X ||position[0] <MIN_X ||position[2] > MAX_Z || position[2] <MIN_Z )
            {
               vehicleState.xVel = -1*vehicleState.xVel ;
            }
            

            vehicleState.xVel+=(vehicleState.xVelTarget-vehicleState.xVel)*FACTOR_INERCIA;
            vehicleState.yVel+=(vehicleState.yVelTarget-vehicleState.yVel)*FACTOR_INERCIA;
            vehicleState.zVel+=(vehicleState.zVelTarget-vehicleState.zVel)*FACTOR_INERCIA;
            

            vehicleState.xRotVel+=(vehicleState.xRotVelTarget-vehicleState.xRotVel)*FACTOR_INERCIA;
            vehicleState.yRotVel+=(vehicleState.yRotVelTarget-vehicleState.yRotVel)*FACTOR_INERCIA;
            vehicleState.zRotVel+=(vehicleState.zRotVelTarget-vehicleState.zRotVel)*FACTOR_INERCIA;


            let translation=vec3.fromValues(vehicleState.xVel,vehicleState.yVel,vehicleState.zVel);                        
            
            if (Math.abs(vehicleState.yRotVel)>0) {
                /*Rota al rededor del eje 'y'*/
                mat4.rotate(rotationMatrix,rotationMatrix,vehicleState.yRotVel,vec3.fromValues(0,1,0)); 
                let posicionActual = vec3.create();
                mat4.getTranslation(posicionActual,autoElevador.obtenerMatrizTransformacion());
                trasladarObjeto(autoElevador,[-1*posicionActual[0],-1*posicionActual[1]  ,-1*posicionActual[2]]);
                rotarObjeto(autoElevador,vehicleState.yRotVel,[0.0,1.0,0.0]);
                trasladarObjeto(autoElevador,[posicionActual[0],posicionActual[1]  ,posicionActual[2]]);
                //roto las camaras acorde a la rotacion del vehiculo
                vec3.rotateY(posicionCamaraLateral,posicionCamaraLateral,[posicionActual[0],posicionActual[1] ,posicionActual[2]],vehicleState.yRotVel);
                vec3.rotateY(posicionCamaraTrasera,posicionCamaraTrasera,[posicionActual[0],posicionActual[1] ,posicionActual[2]],vehicleState.yRotVel);        
                vec3.rotateY(posicionCamaraConductor,posicionCamaraConductor,[posicionActual[0],posicionActual[1] ,posicionActual[2]],vehicleState.yRotVel);        
                vec3.rotateY(posicionTargetConductor,posicionTargetConductor,[posicionActual[0],posicionActual[1] ,posicionActual[2]],vehicleState.yRotVel);        
                     
            }
            
            vec3.transformMat4(translation,translation,rotationMatrix);
            vec3.add(position,position,translation);
            worldMatrix=mat4.create();
            mat4.translate(worldMatrix,worldMatrix,position);        
            mat4.multiply(worldMatrix,worldMatrix,rotationMatrix);
        
            trasladarObjeto(autoElevador,[translation[0],translation[1],translation[2]]);
            trasladarObjeto(palaAutoElevador,[0.0,vehicleState.yVelPala,0.0]);
            //traslado las camaras acorde a la traslacion del vehiculo
            vec3.add(posicionCamaraLateral,posicionCamaraLateral,[translation[0],translation[1],translation[2]]); 
            vec3.add(posicionCamaraTrasera,posicionCamaraTrasera,[translation[0],translation[1],translation[2]]); 
            vec3.add(posicionCamaraConductor,posicionCamaraConductor,[translation[0],translation[1],translation[2]]); 
            vec3.add(posicionTargetConductor,posicionTargetConductor,[translation[0],translation[1],translation[2]]);

            if(vehicleState.sujentadoObjeto)
            {
                trasladarObjeto(objetoImpreso,[0.0,vehicleState.yVelPala,0.0]);    
            }
            //actualizo la camara actual de las camaras firsPerson
            
            if (tipoCamaraActual == "firstPerson4")
             {
                posicionEyeCamara = posicionCamaraConductor;
                posicionCenterCamara = posicionTargetConductor;
             }
            else if (tipoCamaraActual == "firstPerson5")
             {
                posicionEyeCamara = posicionCamaraTrasera;
                posicionCenterCamara = position;
             }
            else if(tipoCamaraActual == "firstPerson6")   
             {
                posicionCenterCamara = position;
                posicionEyeCamara = posicionCamaraLateral;
             }
        }


        this.getViewMatrix=function(){

            let m=mat4.clone(worldMatrix);            
            mat4.invert(m,m);
            return m;
        }

        this.getMatrix=function(){

            return worldMatrix;

        }

    }

    //funcion de la impresora 3d
    function imprimirObjeto()
    {
        if(!objetoEnEspera)
        {
            if(tipoSuperficieGUI == "Barrido")
            {
                 objetoImpreso = new objeto3D(forma2DBarridoGUI); 
                 escalarObjeto(objetoImpreso,[0.3,0.5,0.3]);   
                 trasladarObjeto(objetoImpreso,[1.75,0.1,0.0]);
                 
            }
            else if (tipoSuperficieGUI == "Revolucion")
            {
                 objetoImpreso = new objeto3D(forma2DRevolucionGUI);
                 escalarObjeto(objetoImpreso,[0.5,0.5,0.5]);      
                 trasladarObjeto(objetoImpreso,[1.75,0.1,0.0]);
                 
            }
            trasladarObjeto(CabezalImpresora,[0.0,-0.4992,0.0]);  
            imprimiendo = true;
            objetoEnEspera = true;
            objetoImpreso.setColor([0.8,0.1,0.1]);
            objetoImpreso.setTexture(textures[mapaTexturas.get(mapaOpcionATextura.get(textura))]);
            objetoImpreso.asignarMallaDeTriangulos(objetoImpreso);
            objetosEscena.push(objetoImpreso);
        }
    }

