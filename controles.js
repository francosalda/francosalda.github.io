
    function AutoElevadorControl(initialPos)
    {

        let vec3=glMatrix.vec3;         
        let mat4=glMatrix.mat4;

        
        let DELTA_VELOCIDAD = 0.01; 
        let DELTA_MOVIMIENTO_PALA = 0.001;
        let DELTA_ROTACION=0.02;        
        let FACTOR_AMORTIGUAMIENTO = 0.01;
        
        if (!initialPos) initialPos=[0,0,0];

        let position=vec3.fromValues(initialPos[0],initialPos[1],initialPos[2]);
        let rotation=vec3.create();

        let vehicleInitialState={
            deltaX:0,
            xVel:0,
            zVel:0,
            yVel:0,
            yVelPala:0,
            
            yRotVel:0,
            zRotVel:0,
            xRotVel:0,
            rightAxisMode:"move",
            sujentadoObjeto : false
        }

        let vehicleState=Object.assign({},vehicleInitialState);

        
        // Manejo de eventos del teclado
        document.addEventListener("keydown",function(e) //tecla presionada 
        {
            

            switch ( e.key ) {

                case "ArrowUp": // up
                vehicleState.xVel = +DELTA_VELOCIDAD;
                    break;
                case "ArrowDown":
                vehicleState.xVel = -DELTA_VELOCIDAD;
                
                break;
                case "q": 
                vehicleState.yVelPala = +DELTA_MOVIMIENTO_PALA;
                break;
                case "e":
                vehicleState.yVelPala = - DELTA_MOVIMIENTO_PALA;
                break;
                case "g":
                if(vehicleState.sujentadoObjeto)
                {
                    autoElevador.quitarUltimoHijo();
                    vehicleState.sujentadoObjeto = false;
                }
                else
                {
                    vehicleState.sujentadoObjeto = true;
                    autoElevador.agregarHijo(impresora);
                }

                
                
                break;
           
            }               

        })

        //se suelta la tecla
        document.addEventListener("keyup",function(e){

            switch ( e.key ) 
            {

                case "ArrowUp": 
                vehicleState.xVel=0.0;
                
                break;
                case "ArrowDown":
                vehicleState.xVel=0.0;
                break; 
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


            trasladarObjeto(autoElevador,[vehicleState.xVel ,vehicleState.yVel,vehicleState.zVel]);
            trasladarObjeto(palaAutoElevador,[0.0,vehicleState.yVelPala,0.0]);


        }




    }


