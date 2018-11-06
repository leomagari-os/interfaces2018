extend(PlayerBullet, Sprite);

function PlayerBullet(){
	this.width = 4;
	this.height = 20;
	
	this.image = img_bp;
	this.color = 'rgba(0,0,0,255)';
    	this.element = img_bp.cloneNode();
   	this.element.id="bala-"+Date.now();
   	 game.appendChild(this.element);
    
	this.fin = 0;
	
	this.movimientos = [];
	this.movimiento = null;
	
	this.delay = 0; // delay de la bala
}

PlayerBullet.prototype.checkear = function(){
	Sprite.prototype.checkear.call(this);
	
	// para ver si golpeo al enemigo
	for (var i = 0; i < enemigos.length; i++){
		var e = enemigos[i];
		if (solapamientoArea(this.area(), e.area())){
			e.hit = 1;
						
			this.fin = 1;
		}
	}	
}


PlayerBullet.prototype.area = function(){
	return {x1: Math.min(this.movimiento.xAnterior,this.movimiento.xActual), 
	        y1: Math.min(this.movimiento.yAnterior,this.movimiento.yActual), 
	        x2: Math.max(this.movimiento.xAnterior,this.movimiento.xActual), 
	        y2: Math.max(this.movimiento.yAnterior,this.movimiento.yActual)};
}

