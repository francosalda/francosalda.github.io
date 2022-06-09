class CurvaBezier
{

	constructor(grado)
	{
		console.log("[Debug Curvas]: Nueva curva de Bezier creada de grado:"+grado);
		this.tipo = "bezier";
		this.grado = grado;
		
	}
	//metodos
	establecerGradoCurva(grado)
	{
		this.grado = grado;
	}
	calcularPuntoCurva(u,puntosDeControl)
	{
		var Base0,Base1,Base2,Base3;
		
		if(this.grado == 3)
		{
			//bases
        Base0=function(u) { return (1-u)*(1-u)*(1-u);}  // 1*(1-u) - u*(1-u) = 1-2u+u2  ,  (1-2u+u2) - u +2u2- u3 ,  1 - 3u +3u2 -u3
        Base1=function(u) { return 3*(1-u)*(1-u)*u; } // 3*(1-u)*(u-u2) , 3*(u-u2-u2+u3), 3u -6u2+2u3
        Base2=function(u) { return 3*(1-u)*u*u;} //3u2-3u3
        Base3=function(u) { return u*u*u; }
		}
		else if (this.grado == 2)
		{
			
		}
		else {Console.log("[ERROR CURVAS]: Grado de curva no soportado");}
		
             
      

		var p0=puntosDeControl[0];
        var p1=puntosDeControl[1];
        var p2=puntosDeControl[2];
        var p3=puntosDeControl[3];

        var punto=new Object();

        punto.x=Base0(u)*p0[0]+Base1(u)*p1[0]+Base2(u)*p2[0]+Base3(u)*p3[0];
        punto.y=Base0(u)*p0[1]+Base1(u)*p1[1]+Base2(u)*p2[1]+Base3(u)*p3[1];
        punto.z=Base0(u)*p0[2]+Base1(u)*p1[2]+Base2(u)*p2[2]+Base3(u)*p3[2];
        return punto;
	}
	calcularPuntoCurvaDerivada(u,puntosDeControl)
	{
		var Base0der,Base1der,Base2der,Base3der;
		// bases derivadas
        Base0der=function(u) { return -3*u*u+6*u-3;} //-3u2 +6u -3
        Base1der=function(u) { return 9*u*u-12*u+3; }  // 9u2 -12u +3
        Base2der=function(u) { return -9*u*u+6*u;}      // -9u2 +6u
        Base3der=function(u) { return 3*u*u; }         // 3u2

        var p0=puntosDeControl[0];
        var p1=puntosDeControl[1];
        var p2=puntosDeControl[2];
        var p3=puntosDeControl[3];

        var punto=new Object();
        //escribir calculo del punto de la derivada de la curva..
        return punto;

	}



};

