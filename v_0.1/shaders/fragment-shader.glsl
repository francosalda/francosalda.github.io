        precision mediump float;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying vec3 vFixedColorObject;

    
        uniform bool uUseReflectionCubeMap; // usar reflexion del cube-Map si/no 
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
        //luces puntuales
        uniform vec3 uLightPositionPoint1; //posicion de luz puntual1
        uniform vec3 uLightPositionPoint2; // posicion de luz puntual2
        uniform vec3 uLightPositionPoint3; // posicion de luz puntual3
        uniform vec3 uLightPositionPoint4; // posicion de luz puntual3

        
        uniform sampler2D uSampler_0;       //sampler de textura
        uniform samplerCube u_texture;  //sampler de cube-map
        uniform vec3 u_worldCameraPosition; // posicion de la camara
        
        //calcula la luz de un spot
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
        //calcula la luz de una fuente puntual
        float calculateBrightnessPoint(vec3 posicionLuzPuntual)
        {
            vec3 offset = posicionLuzPuntual-vWorldPosition;
            float distance = length(offset);
            vec3 direction = normalize(offset);
            float diffuse = max(0.0,dot(direction,vNormal));
            float attenuation = 1.0/(   (distance * distance)*3.0+1.0);
            return diffuse * attenuation;
        }

        //suma el aporte de todas las luces puntuales
        float calculateTotalBritghnessPoints()
        {

            float brightTotalPoints = calculateBrightnessPoint(uLightPositionPoint1);
            brightTotalPoints += calculateBrightnessPoint(uLightPositionPoint2);
            brightTotalPoints += calculateBrightnessPoint(uLightPositionPoint3);
            brightTotalPoints += calculateBrightnessPoint(uLightPositionPoint4);
            return brightTotalPoints;
        }

        //suma el aporte de todas las fuentes de luz spot
        float calculateTotalBrightnessSpot()
        {
            float brightnessSpot1  = calculateBrightnessSpot(uLightPositionSpot1);
            float brightnessSpot2  = calculateBrightnessSpot(uLightPositionSpot2);
            float brightnessSpot3  = calculateBrightnessSpot(uLightPositionSpot3);
            float brightnessSpot4  = calculateBrightnessSpot(uLightPositionSpot4);
            float brightnessSpot5  = calculateBrightnessSpot(uLightPositionSpot5);
            float brightnessSpot6  = calculateBrightnessSpot(uLightPositionSpot6);
            return brightnessSpot1+brightnessSpot2+brightnessSpot3+brightnessSpot4+brightnessSpot5+brightnessSpot6;
            
        }
        


        void main(void) 
        {        

            if (uUseLighting)
            {
                //reflexion del cube map
                vec3 eyeToSurfaceDir = normalize(vWorldPosition - u_worldCameraPosition);
                vec3 direction = reflect(eyeToSurfaceDir,vNormal);
                vec4 reflectedColor =textureCube(u_texture, direction);

                //luces difusas
                float brightness = calculateTotalBritghnessPoints()+calculateTotalBrightnessSpot();
                vec4 diffuseColor=(texture2D(uSampler_0, vUv)*(uAmbientColor,1.0))*.2+(texture2D(uSampler_0, vUv)* brightness) * 0.8;

                if(uUseReflectionCubeMap)
                {
                    gl_FragColor = mix(diffuseColor,reflectedColor,0.6);
                }
                else
                {
                    gl_FragColor = diffuseColor;
                }
                
                gl_FragColor.a = 1.0;

            }
            else
                //sin iluminacion utilizar colores sólidos
                gl_FragColor = vec4(vFixedColorObject,1.0);
            
        }