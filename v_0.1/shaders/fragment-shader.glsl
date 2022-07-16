        precision mediump float;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying vec3 vFixedColorObject;
    
         
    
        
  

        //Iluminacion
        uniform vec3 uAmbientColor;         // color de luz ambiente
        uniform vec3 uLightPositionLoc; // posicion del spot de luz
        uniform vec3 uLightDirectionLoc; // direccion del spot
        uniform float uLightInnerCutOffLoc; // angulo interno 
        uniform float uLightOutterCutOffLoc; // angulo externo
        uniform bool uUseLighting;          // usar iluminacion si/no

        uniform sampler2D uSampler_0;       //sampler de textura


        void main(void) {        

            if (uUseLighting)
            {

            vec3 pointToLightOffset =  uLightPositionLoc -vWorldPosition;
            vec3 pointToLightDirection = normalize(pointToLightOffset);
            vec3 lightToPointDirection = -pointToLightDirection;
            //spotlight
            float diffuse = max(0.0,dot(pointToLightDirection,vNormal));
            float angleToSurface = dot(uLightDirectionLoc,lightToPointDirection);
            float spot = smoothstep(uLightOutterCutOffLoc,uLightInnerCutOffLoc,angleToSurface);
            float brightness = diffuse * spot;
            gl_FragColor = (texture2D(uSampler_0, vUv)*(uAmbientColor,1.0))*.2+(texture2D(uSampler_0, vUv)* brightness) * 0.8; //20% luz ambiente+ 80% luz de fuentes 
            gl_FragColor.a = 1.0;

            }
          
            else
                //colores sólidos
                gl_FragColor = vec4(vFixedColorObject,1.0);
            
        }