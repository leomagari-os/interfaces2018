
function Sprite(){
	this.width = 1;
	this.height = 1;
	
	this.image = null;
	this.color = 'rgba(0,0,0,255)';
	
	this.fin = 0; // si es 1, se borra el sprite en el siguiente ciclo
	this.id= null;
	this.movimientos = []; // lista de objetos Movimiento 
	this.movimiento = null; // el Movimiento actual
	this.element=null;
}
Sprite.prototype.addElement = function(ele){
	this.element=ele;
}
Sprite.prototype.addMovimiento = function(mov){
	this.movimientos[this.movimientos.length] = mov;
	
	if (this.movimientos.length == 1 && this.movimiento == null)
		this.movimiento = this.movimientos[0];
}

Sprite.prototype.addMovimientoRelacional = function(mov){
	mov.relative = 1;
	this.addMovimiento(mov);
}

Sprite.prototype.addMovimientoLoop = function(mov){
	mov.relative = 1;
	mov.ciclico = 1;
	this.addMovimiento(mov);
}


Sprite.prototype.mover = function(){
	// si no tiene mas movimientos quito el sprite
	if (this.movimientos.length == 0){
		this.element.parentNode.removeChild(this.element);
		this.fin = 1;
		return;
	}
	
	// inicializo si esta en null
	if (this.movimiento == null){
		this.movimiento = this.movimientos[0];
	}
	
	
	if (this.movimiento.terminado == 1){
		//guardo las coordenadas 
		var xFinal = this.movimiento.xActual;
		var yFinal = this.movimiento.yActual;
		
		//quito el movimiento actual del arreglo
		this.movimientos.splice(0,1);
		
		// si es ciclico pongo el movimiento al final del arreglo
		if (this.movimiento.ciclico == 1)
		{
			this.movimiento.reset();
			this.movimientos[this.movimientos.length] = this.movimiento;
		}
			
		// el primer movimiento del arreglo es el actual
		if (this.movimientos.length > 0){
			this.movimiento = this.movimientos[0];
			
			if (this.movimiento.relative){
				var m = new Movimiento(this.movimiento.velocidad, xFinal, yFinal, this.movimiento.xFinal, this.movimiento.yFinal);
				m.relacional = 1;
				m.ciclico = this.movimiento.ciclico;
				m.limiteTiempo = this.movimiento.limiteTiempo;
				this.movimiento = m;
			}
		}else{
			this.fin = 1;
			return;
		}
	}
		
	this.movimiento.mover();
}


Sprite.prototype.checkear = function(){
	// checkeo si el sprite se fue de la pantalla
	if (this.movimiento.xActual > bg.w+10 ||
	    this.movimiento.yActual > bg.h+10 ||
	    this.movimiento.xActual < -10 ||
	    this.movimiento.yActual < -10){
		
    this.fin = 1;
  }
}
  
Sprite.prototype.dibujar = function(){
	if(this.element!=null){
		this.element.style.left=this.movimiento.xActual+"px";
		this.element.style.top=this.movimiento.yActual+"px";
	}
	
}
 
 
Sprite.prototype.area = function(){
	return {
		x1: this.movimiento.xActual-this.width/3+4, 
		y1: this.movimiento.yActual-this.height/3+4, 
		x2: this.movimiento.xActual+this.width/3-4, 
		y2: this.movimiento.yActual+this.height/3-4	        
	        };
}


Sprite.prototype.update = function(){
	this.mover();
	this.checkear();
	this.dibujar();
}