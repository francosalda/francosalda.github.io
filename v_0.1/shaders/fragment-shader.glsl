        precision mediump float;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        varying vec3 vFixedColorObject;
        

        uniform vec3 uAmbientColor;         // color de luz ambiente
        uniform vec3 uDirectionalColor;	    // color de luz direccional
        uniform vec3 uLightPosition;        // posición de la luz
        
        uniform bool uUseLighting;          // usar iluminacion si/no

        uniform sampler2D uSampler_0;

        void main(void) {
            
            vec3 lightDirection= normalize(uLightPosition - vec3(vWorldPosition));
            
            vec3 color=(uAmbientColor+uDirectionalColor*max(dot(vNormal,lightDirection), 0.0));
           
           color.x=vUv.x;
           color.y=vUv.y;
           color.z=0.0;
           
            if (uUseLighting)
               // gl_FragColor = vec4(color,1.0);
               gl_FragColor = texture2D(uSampler_0, vUv);
            else
                //gl_FragColor = vec4(0.7,0.7,0.7,1.0);
                gl_FragColor = vec4(vFixedColorObject,1.0);
            
        }