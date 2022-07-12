
    function AutoElevadorControl(initialPos){

        let MIN_Y=1;

        let DELTA_TRASLACION=0.05;        // velocidad de traslacion 
        let DELTA_ROTACION=0.02;         // velocidad de rotacion
        let DELTA_MOVIMIENTO_PALA = 0.002; 
        let FACTOR_INERCIA=0.05;

        let vec3=glMatrix.vec3;          // defino vec3 para no tener que escribir glMatrix.vec3
        let mat4=glMatrix.mat4;

        if (!initialPos) initialPos=[0,0,0];

        let targetPosition=vec3.fromValues(initialPos[0],initialPos[1],initialPos[2]);
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

        
        // Eventos de teclado **********************************************

        document.addEventListener("keydown",function(e){
            switch ( e.key ) {

                //avanzar
                case "ArrowUp": case"w":
                    vehicleState.xVelTarget=DELTA_TRASLACION;break;
                break;
                //retroceder
                case "ArrowDown": case"s":
                    vehicleState.xVelTarget=-DELTA_TRASLACION;break;
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

               
            }               

        })

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
            
        })
        

        this.update=function()
        {
            
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
                     
            }
            
            vec3.transformMat4(translation,translation,rotationMatrix);
            vec3.add(targetPosition,targetPosition,translation);
            worldMatrix=mat4.create();
            mat4.translate(worldMatrix,worldMatrix,targetPosition);        
            mat4.multiply(worldMatrix,worldMatrix,rotationMatrix);
        
            trasladarObjeto(autoElevador,[translation[0],translation[1],translation[2]]);
            trasladarObjeto(palaAutoElevador,[0.0,vehicleState.yVelPala,0.0]);
            if(vehicleState.sujentadoObjeto)
            {
                trasladarObjeto(objetoImpreso,[0.0,vehicleState.yVelPala,0.0]);    
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
            var textureObjetoImpreso = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, textureObjetoImpreso);
             //Fill the texture with a 1x1 blue pixel.
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0.0,1.0,0.0,1.0]));
            // Asynchronously load an image
            var imageObjetoImpreso = new Image();
            imageObjetoImpreso.src = "maps/leather_red_03_coll1_1k.jpg";
            imageObjetoImpreso.addEventListener('load', function() {
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_2D, textureObjetoImpreso);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, imageObjetoImpreso);
            //gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.bindTexture(gl.TEXTURE_2D, null);
            });
            objetoImpreso.setTextura(textureObjetoImpreso);
            objetoImpreso.setColor([0.8,0.1,0.1]);
            objetoImpreso.asignarMallaDeTriangulos(objetoImpreso);
            objetosEscena.push(objetoImpreso);
        }
    }
