extend(EnemyBullet, Sprite);

function EnemyBullet(){
	this.width = 8;
	this.height = 8;
	
	this.image = null;
	this.color = 'rgba(0,0,0,255)';
	
    this.fin = 0;
    
     this.element = null;
	
	this.movimientos = [];
	this.movimiento = null;
	
	this.delay = 0; // delay
	
	this.homing = 0; // si es 1, sigue al jugador
}

EnemyBullet.prototype.checkear = function(){
	Sprite.prototype.checkear.call(this);

	// checkeo si la bala le pega al jugador
	if (solapamientoArea(this.area(), jg.area())){
		jg.vida -= 1;
		this.fin = 1;
	}
	
}

EnemyBullet.prototype.area = function(){
	return {x1: Math.min(this.movimiento.xAnterior,this.movimiento.xActual), 
	        y1: Math.min(this.movimiento.yAnterior,this.movimiento.yActual), 
	        x2: Math.max(this.movimiento.xAnterior,this.movimiento.xActual), 
	        y2: Math.max(this.movimiento.yAnterior,this.movimiento.yActual)};
}
