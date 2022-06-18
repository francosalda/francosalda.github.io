
    function AutoElevadorControl(initialPos){

       let MIN_Y=1;

        let DELTA_TRASLACION=0.02;        // velocidad de traslacion
        let DELTA_VELOCIDAD = 0.001; 
        let DELTA_ROTACION=0.02;         // velocidad de rotacion
        let FACTOR_INERCIA=0.5;

        let vec3=glMatrix.vec3;          // defino vec3 para no tener que escribir glMatrix.vec3
        let mat4=glMatrix.mat4;

        if (!initialPos) initialPos=[0,0,0];

        let position=vec3.fromValues(initialPos[0],initialPos[1],initialPos[2]);
        let rotation=vec3.create();

        let rotationMatrix=mat4.create();		

        

        let vehicleInitialState={
            deltaX:0,
            xVel:0,
            zVel:0,
            yVel:0,
            xVelTarget:0,
            zVelTarget:0,
            yVelTarget:0,

            yRotVelTarget:0,
            yRotVel:0,
            zRotVelTarget:0,
            zRotVel:0,
            xRotVelTarget:0,
            xRotVel:0,
            
            rightAxisMode:"move"
        }

        let vehicleState=Object.assign({},vehicleInitialState);

        
        // Eventos de teclado **********************************************

        document.addEventListener("keydown",function(e) //tecla presionada 
        {
            
                
            /*
                ASDWQE para rotar en 3 ejes en el espacio del objeto

                Flechas + PgUp/PgDw o HJKUOL para trasladar en el espacio del objeto

            */

            switch ( e.key ) {

                case "ArrowUp": // up
                vehicleState.deltaX = +DELTA_VELOCIDAD;
                trasladarObjeto(autoElevador,[0.1,0.0,0.0]);
                //vehicleState.xVelTarget=+DELTA_VELOCIDAD; 
                    break;
                case "ArrowDown":
                trasladarObjeto(autoElevador,[-0.1,0.0,0.0]);
                vehicleState.deltaX = -DELTA_VELOCIDAD;
                
                //vehicleState.xVelTarget=-DELTA_VELOCIDAD; 
                break;
            /*    case "ArrowDown": case "j": // down
                    camState.zVelTarget=DELTA_TRASLACION; break; 

                case "ArrowLeft": case "h": // left
                    camState.xVelTarget=DELTA_TRASLACION;break;
                case "ArrowRight": case "k": // right
                    camState.xVelTarget=-DELTA_TRASLACION; break;   

                case "o": case "PageUp": // PgUp
                    camState.yVelTarget=DELTA_TRASLACION;break;
                case "l": case "PageDown":// PgDw
                    camState.yVelTarget=-DELTA_TRASLACION; break;        
   

                case "s":
                    camState.xRotVelTarget=DELTA_ROTACION;break;                                 
                case "w": 
                    camState.xRotVelTarget=-DELTA_ROTACION;break;


                case "a": 
                    camState.yRotVelTarget=DELTA_ROTACION; break;                
                case "d": 
                    camState.yRotVelTarget=-DELTA_ROTACION; break;         

            
                case "q":
                    camState.zRotVelTarget=DELTA_ROTACION;break;                                 
                case "e": 
                    camState.zRotVelTarget=-DELTA_ROTACION;break;            


                        
                case "r": 
                    rotation=vec3.create();
                    position=vec3.fromValues(initialPos[0],initialPos[1],initialPos[2]);
                    camState=Object.assign({},camInitialState);
                    rotationMatrix=mat4.create();
                    break;

                case "t": 
                    rotation=vec3.create();                    
                    camState=Object.assign({},camInitialState);
                    break;                    
*/
            }               

        })

        //tecla soltada
        document.addEventListener("keyup",function(e){

            switch ( e.key ) 
            {

                case "ArrowUp": 
                vehicleState.deltaX=0.0;
                
                
                break;
                case "ArrowDown":
                vehicleState.deltaX=0.0;
                
                break; 

                /*case "ArrowUp":  case "u": case "ArrowDown": case "j": 
                    vehicleInitialState.zVelTarget=0;
                    console.log("Tecla hacia arriba liberada"); break;
                /*
                case "ArrowLeft": case "h": case "ArrowRight": case "k": 
                    camState.xVelTarget=0; break;  

                case "o": case "l": 
                case "PageDown": case "PageUp":
                    camState.yVelTarget=0;break;
    
  
                case "a": 
                    camState.yRotVelTarget=0; break;
                case "d": 
                    camState.yRotVelTarget=0; break;
                    
                case "w": 
                    camState.xRotVelTarget=0;break; 
                case "s":
                    camState.xRotVelTarget=0;break;                           
            
                case "q": 
                    camState.zRotVelTarget=0;break; 
                case "e":
                    camState.zRotVelTarget=0;break;                           
                    
          */
            }                 
            
        })
        

        this.update=function(){
          //trasladarObjeto(objetosEscena[0],[0.05,0.0,0.0]);
          //trasladarObjeto(objetosEscena[0],[-0.05,0.0,0.0]);

            //let posicionActual = vec3.fromValues(-vehicleState.xVel,vehicleState.yVel,-vehicleState.zVel);

        /*     vehicleState.xVel +=  vehicleState.xVelTarget- vehicleState.xVel;
             

            // si tengo velocidad entonces estoy acelerando
            if(Math.abs(vehicleState.xVel) >= DELTA_VELOCIDAD)
            {
                position = mat4.getTranslation(position, objetosEscena[0].obtenerMatrizTransformacion());
                position[0] += -Math.abs( position[0]  -vehicleState.xVel);


                trasladarObjeto(objetosEscena[0],position);      
            }
*/
         //vec3.add(position,position,translation);
         
         //   trasladarObjeto(objetosEscena[0],[vehicleState.xVelTarget,0.0,0.0]);      
         
         


        //position = vec3.fromValues(-vehicleState.xVel,vehicleState.yVel,-vehicleState.zVel);
        //vehicleState        

/*            vehicleState.xVel =vehicleState.xVel +(vehicleState.xVelTarget- vehicleState.xVel) * FACTOR_INERCIA;
            let translation=vec3.fromValues(-vehicleState.xVel,vehicleState.yVel,-vehicleState.zVel);
            
            vec3.add(position,position,translation);
            
            let actualPos = [];
            mat4.getTranslation(actualPos, objetosEscena[0].obtenerMatrizTransformacion());
            
  */          //trasladarObjeto(objetosEscena[0],position);    

            
            
           /* vec3.transformMat4(translation,translation,rotationMatrix);
            vec3.add(position,position,translation);

            matrizM = mat4.clone(objetosEscena[0].obtenerMatrizTransformacion());
            mat4.translate(matrizM,matrizM,position);
            mat4.multiply(matrizM,matrizM,rotationMatrix);   

            transformarObjeto(objetosEscena[0],matrizM);

            //trasladarObjeto(objetosEscena[0],position);    
            */
            



          //  vec3.transformMat4(translation,translation,rotationMatrix);
           // vec3.add(position,position,translation);               

            //mat4.translate(matrizModelado,matrizModelado,position);
           // console.log("Position:",translation);
            

         /*   
            camState.xVel+=(camState.xVelTarget-camState.xVel)*FACTOR_INERCIA;
            camState.yVel+=(camState.yVelTarget-camState.yVel)*FACTOR_INERCIA;
            camState.zVel+=(camState.zVelTarget-camState.zVel)*FACTOR_INERCIA;

            camState.xRotVel+=(camState.xRotVelTarget-camState.xRotVel)*FACTOR_INERCIA;
            camState.yRotVel+=(camState.yRotVelTarget-camState.yRotVel)*FACTOR_INERCIA;
            camState.zRotVel+=(camState.zRotVelTarget-camState.zRotVel)*FACTOR_INERCIA;

            let translation=vec3.fromValues(-camState.xVel,camState.yVel,-camState.zVel);                        
            

            if (Math.abs(camState.xRotVel)>0) {		
                // este metodo aplica una rotacion en el eje AXIS en el espacio del objeto o respecto del eje "local", NO el eje de mundo
                mat4.rotate(rotationMatrix,rotationMatrix,camState.xRotVel,vec3.fromValues(1,0,0));                
            }

            if (Math.abs(camState.yRotVel)>0) {
                mat4.rotate(rotationMatrix,rotationMatrix,camState.yRotVel,vec3.fromValues(0,1,0));                
            }
            
            if (Math.abs(camState.zRotVel)>0) {
                mat4.rotate(rotationMatrix,rotationMatrix,camState.zRotVel,vec3.fromValues(0,0,1));                
            }
            

            vec3.transformMat4(translation,translation,rotationMatrix);
            vec3.add(position,position,translation);

            matrizModelado=mat4.create();
            mat4.translate(matrizModelado,matrizModelado,position);        
            mat4.multiply(matrizModelado,matrizModelado,rotationMatrix);
           */ 
            
        }

/*
        this.getViewMatrix=function(){

            let m=mat4.clone(matrizModelado);            
            mat4.invert(m,m);
            return m;
        }

        this.getMatrix=function(){

            return matrizModelado;

        }
*/


    }
