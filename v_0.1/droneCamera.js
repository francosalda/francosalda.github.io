
    function DroneCameraControl(initialPos){

        let MIN_Y=1;

        let DELTA_TRASLACION=0.05;        // velocidad de traslacion 
        let DELTA_ROTACION=0.02;         // velocidad de rotacion
        let FACTOR_INERCIA=0.05;

        let vec3=glMatrix.vec3;          // defino vec3 para no tener que escribir glMatrix.vec3
        let mat4=glMatrix.mat4;

        if (!initialPos) initialPos=[0,0,0];

        let targetPosition=vec3.fromValues(initialPos[0],initialPos[1],initialPos[2]);
        let rotation=vec3.create();

        let rotationMatrix=mat4.create();		

        let worldMatrix=mat4.create();

        let camInitialState={
            xVel:0,
            zVel:0,
            yVel:0,
            xVelTarget:0,
            zVelTarget:0,
            yVelTarget:0,
            xPos:0,
            yPos:0,
            zPos:0, 


            yRotVelTarget:0,
            yRotVel:0,
            zRotVelTarget:0,
            zRotVel:0,
            xRotVelTarget:0,
            xRotVel:0,
            
            rightAxisMode:"move"
        }

        let camState=Object.assign({},camInitialState);

        
        // Eventos de teclado **********************************************

        document.addEventListener("keydown",function(e){
            switch ( e.key ) {

                //avanzar
                case "ArrowUp": case"w":
                    camState.xVelTarget=DELTA_TRASLACION;break;
                break;
                //retroceder
                case "ArrowDown": case"s":
                    camState.xVelTarget=-DELTA_TRASLACION;break;
                break;
                //girar sobre el eje 'y'
                case "a":
                    camState.yRotVelTarget=DELTA_ROTACION;
                break;
                case "d": 
                    camState.yRotVelTarget=-DELTA_ROTACION;
                break;

               
            }               

        })

        document.addEventListener("keyup",function(e){

            switch ( e.key ) 
            {
                case "ArrowUp":  case "w":
                    camState.xVelTarget=0; break;
                
                case "ArrowDown": case "s": 
                    camState.xVelTarget=0; break; 
  
                case "a": 
                    camState.yRotVelTarget=0; break;
                case "d": 
                    camState.yRotVelTarget=0; break;
                    
                                              
          
            }                 
            
        })
        

        this.update=function()
        {
            
            camState.xVel+=(camState.xVelTarget-camState.xVel)*FACTOR_INERCIA;
            camState.yVel+=(camState.yVelTarget-camState.yVel)*FACTOR_INERCIA;
            camState.zVel+=(camState.zVelTarget-camState.zVel)*FACTOR_INERCIA;
            

            camState.xRotVel+=(camState.xRotVelTarget-camState.xRotVel)*FACTOR_INERCIA;
            camState.yRotVel+=(camState.yRotVelTarget-camState.yRotVel)*FACTOR_INERCIA;
            camState.zRotVel+=(camState.zRotVelTarget-camState.zRotVel)*FACTOR_INERCIA;


            let translation=vec3.fromValues(camState.xVel,camState.yVel,camState.zVel);                        
            
            if (Math.abs(camState.yRotVel)>0) {
                mat4.rotate(rotationMatrix,rotationMatrix,camState.yRotVel,vec3.fromValues(0,1,0)); 
                
                console.log("targetposiio",targetPosition);
                let posicionActual = vec3.create();
                mat4.getTranslation(posicionActual,autoElevador.obtenerMatrizTransformacion());
                trasladarObjeto(autoElevador,[-1*posicionActual[0],-1*posicionActual[1]  ,-1*posicionActual[2]]);
                rotarObjeto(autoElevador,camState.yRotVel,[0.0,1.0,0.0]);
                trasladarObjeto(autoElevador,[posicionActual[0],posicionActual[1]  ,posicionActual[2]]);
                     
            }
            
            vec3.transformMat4(translation,translation,rotationMatrix);
            vec3.add(targetPosition,targetPosition,translation);
            worldMatrix=mat4.create();
            mat4.translate(worldMatrix,worldMatrix,targetPosition);        
            mat4.multiply(worldMatrix,worldMatrix,rotationMatrix);
        
            trasladarObjeto(autoElevador,[translation[0],translation[1],translation[2]]);
        
            
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
