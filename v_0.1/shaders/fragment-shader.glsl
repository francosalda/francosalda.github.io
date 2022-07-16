        precision mediump float;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying vec3 vFixedColorObject;
    

        uniform bool uUseLighting;          // usar iluminacion si/no
        //Luces spots
        uniform vec3 uAmbientColor;         // color de luz ambiente
        uniform vec3 uLightPositionSpot1; // posicion del spot de luz1
        uniform vec3 uLightPositionSpot2; // posicion del spot de luz2
        uniform vec3 uLightPositionSpot3; // posicion del spot de luz3
        uniform vec3 uLightPositionSpot4; // posicion del spot de luz4
        uniform vec3 uLightPositionSpot5; // posicion del spot de luz5
        uniform vec3 uLightPositionSpot6; // posicion del spot de luz6
        uniform vec3 uLightDirectionSpot; // direccion del spot
        uniform float uLightInnerCutOffSpot; // angulo interno 
        uniform float uLightOutterCutOffSpot; // angulo externo

        
        uniform sampler2D uSampler_0;       //sampler de textura
        //calcula la luz de cada spot
        float calculateBrightnessSpot(vec3 posicionLuz)
        {
            vec3 pointToLightOffset =  posicionLuz -vWorldPosition;
            vec3 pointToLightDirection = normalize(pointToLightOffset);
            vec3 lightToPointDirection = -pointToLightDirection;
            //spotlight
            float diffuse = max(0.0,dot(pointToLightDirection,vNormal));
            float angleToSurface = dot(uLightDirectionSpot,lightToPointDirection);
            float spot = smoothstep(uLightOutterCutOffSpot,uLightInnerCutOffSpot,angleToSurface);
            float brightnessSpot = diffuse * spot;
            return brightnessSpot;

        }

        //suma el aporte de todas las fuentes de luces 
        float calculateBrightness()
        {
            float brightnessSpot1  = calculateBrightnessSpot(uLightPositionSpot1);
            float brightnessSpot2  = calculateBrightnessSpot(uLightPositionSpot2);
            float brightnessSpot3  = calculateBrightnessSpot(uLightPositionSpot3);
            float brightnessSpot4  = calculateBrightnessSpot(uLightPositionSpot4);
            float brightnessSpot5  = calculateBrightnessSpot(uLightPositionSpot5);
            float brightnessSpot6  = calculateBrightnessSpot(uLightPositionSpot6);

            return brightnessSpot1+brightnessSpot2+brightnessSpot3+brightnessSpot4+brightnessSpot5+brightnessSpot6;
            
        }
        


        void main(void) {        

            if (uUseLighting)
            {
            
            float brightness = calculateBrightness();
            gl_FragColor = (texture2D(uSampler_0, vUv)*(uAmbientColor,1.0))*.2+(texture2D(uSampler_0, vUv)* brightness) * 0.8; //20% luz ambiente+ 80% luz de fuentes 
            gl_FragColor.a = 1.0;

            }
          
            else
                //colores sólidos
                gl_FragColor = vec4(vFixedColorObject,1.0);
            
        }