function PatronDisparo(){
	this.ts = 100; 
	this.cs = 0; 
	
	this.bullets = []; 
}

PatronDisparo.prototype.addBullet = function(bul){
	this.bullets[this.bullets.length] = bul;
}
	
PatronDisparo.prototype.fire = function(){
	var fired = [];
	for (var i = 0; i < this.bullets.length; i++)
	{
		var b = this.bullets[i];
		
		if (b.delay == this.cs){
			var bc = new EnemyBullet(); 
			bc.width = b.width;
			bc.height = b.height;
            bc.image = b.image;
            bc.element = b.image.cloneNode();
			bc.element.id="bala-e-"+Date.now();
			game.appendChild(bc.element);
            bc.homing = b.homing;
      
			var mc = new Movimiento(b.movimiento.velocidad, b.movimiento.xInicial, b.movimiento.yInicial, b.movimiento.xFinal, b.movimiento.yFinal);
			bc.addMovimiento(mc); 
      
			fired[fired.length] = bc;
		}
	}
	this.cs++;
  
	if (this.cs > this.ts)
		this.cs = 0;
  
	return fired;
}