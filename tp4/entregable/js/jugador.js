extend(Jugador, Sprite);
function Jugador(){
	this.width = 28;
	this.height = 29;
	
	this.image = null;
	this.color = 'rgba(255,0,0,255)';
	
	this.fin = 0;
	this.vida = 10;
	this.graze = 0;
	this.element=null;
	this.movimientos = [];
	this.movimiento = null;
	
	this.power = 0; 	
}

Jugador.prototype.mover = function(){
	if(this.vida!=0){
		var m = 7; 		// normal movimiento
		if(ml_j == 1){
			m  = 3;
			//this.image = img_pg_slw;
				
		}else{
			this.image = img_pg;
		} // slow
		
		// diagonal movimiento
		if(arr_j + ab_j + izq_j + der_j > 1)
			m = m * 0.7;
		
		// actualiza la posicion del Jugador 
		if(arr_j == 1) 
			this.movimiento.yActual -= m;
		if(ab_j == 1) 
			this.movimiento.yActual += m;
		if(izq_j == 1) 
			this.movimiento.xActual -= m;
		if(der_j == 1) 
			this.movimiento.xActual += m;
			
		// para no irse de la pantalla
		if(this.movimiento.xActual >= bg.w - bg.padding-100)
			this.movimiento.xActual = bg.w - bg.padding-100;
		if(this.movimiento.xActual <= bg.padding) 
			this.movimiento.xActual = bg.padding;
		if(this.movimiento.yActual >= bg.h - bg.padding) 
			this.movimiento.yActual = bg.h - bg.padding;
		if(this.movimiento.yActual <= bg.padding)
			this.movimiento.yActual = bg.padding;
			this.element.style.left=this.movimiento.xActual+"px";
			this.element.style.bottom=this.movimiento.yActual+"px";
	
	}
}

// fire bullets
Jugador.prototype.dispara = function(){        
	if (this.power < 10){
		var b1 = new PlayerBullet();
		var m1 = new Movimiento(25, this.movimiento.xActual+5, this.movimiento.yActual, this.movimiento.xActual+5, -10);
		b1.addMovimiento(m1);
		bullets[bullets.length] = b1;
		
		var b2 = new PlayerBullet();
		var m2 = new Movimiento(25, this.movimiento.xActual+12, this.movimiento.yActual, this.movimiento.xActual+12, -10);
		b2.addMovimiento(m2);
		bullets[bullets.length] = b2;
	}
	
}



	
Jugador.prototype.update = function(){
    Sprite.prototype.update.call(this);
	if (disp_j == 1){
		this.dispara()
		
	}
	
}
Jugador.prototype.area = function(){
	return {
		x1: this.movimiento.xActual, 
		y1: this.movimiento.yActual, 
		x2: this.movimiento.xActual+this.width	, 
		y2: this.movimiento.yActual+this.height	        
	        };
}