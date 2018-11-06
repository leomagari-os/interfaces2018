function Movimiento(velocidad, xIni, yInicial, xFin, yFin){
	this.velocidad = velocidad; //  velocidad del movimiento
	
	this.xInicial = xIni; //  x inicial
	this.yInicial = yInicial; //y inicial
	this.xFinal = xFin; //x final
	this.yFinal = yFin; //y final
	this.xActual = xIni; // x actual
	this.yActual = yInicial; // y actual
	this.xAnterior = xIni; // x anterior
	this.yAnterior = yInicial; // y anterior
	
	var movTotalX = this.xFinal - this.xInicial; // Movimiento tam, eje x
	var movTotalY = this.yFinal - this.yInicial; // Movimiento tam, eje y
	var movTotalDiagonal = Math.sqrt(Math.pow(movTotalX,2)+Math.pow(movTotalY,2)); //tam en eje diagonal 
	
	this.cantFrames = movTotalDiagonal/this.velocidad; // total frames (distancia/velocidad)
	this.frameActual = 0; // frame actual
	this.limiteTiempo = 0; // limite de tiempo (si es > 0, Movimiento se corta a esta longitud)
	
	this.relacional = 0; // si es 1, el Movimiento empieza donde termino el anterior
	this.ciclico = 0; // si es 1,.el movimiento sera ciclico hasta el limiteTiempo
	
	this.movX = movTotalX/this.cantFrames;		// Movimiento por frame, eje x
	this.movY = movTotalY/this.cantFrames;		// Movimiento por frame, eje y
	
	
	if (this.velocidad == 0){
		this.movX = 0;
		this.movY = 0;
	}
	
	this.terminado = 0;
}

//   Movimiento por frame
Movimiento.prototype.mover = function(){
	//guarda la posicion anterior
	this.xAnterior = this.xActual;
	this.yAnterior = this.yActual;
	
	// incrementa la posicion actual
	this.xActual += this.movX;
	this.yActual += this.movY;
	
	// incremento el frame
	this.frameActual++;
	
	// chequeo si el movimiento finalizo 
	if (this.frameActual >= this.cantFrames || (this.limiteTiempo > 0 && this.frameActual >= this.limiteTiempo)){
		this.terminado = 1;
	}
}

// resetea Movimiento al valor inicial
Movimiento.prototype.reset = function(){
	this.xActual = this.xInicial;
	this.yActual = this.yInicial;
	this.xAnterior = this.xInicial;
	this.yAnterior = this.yInicial;
	this.frameActual = 0;
	this.terminado = 0;
}