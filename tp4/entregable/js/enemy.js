extend(Enemigo, Sprite);

function Enemigo(){
	this.width = 24;
	this.height = 24;
	this.id=null;
	this.image = null;
	this.color = 'rgba(0,128,0,255)';
	this.element = null;
	
	this.fin = 0;
	
	this.movimientos = [];
	this.movimiento = null;
  
	this.hit = 0; 		// indicates if the enemy has been hit this frame
	this.life = 10;		// life points
	this.level = 1; 	// enemy level (1 to 5) to calculate drops and score.
	
	this.patrondisparo = null;	// disparaing pattern
	
	this.delay = 0;		// spawn delay
}

Enemigo.prototype.checkear = function(){
        Sprite.prototype.checkear.call(this);
	
        // recibio un disparo
        if(this.hit == 1){
			this.hit = 0;
			this.life -= 1;
        }
	
	// recibio un disparo y finalizo
	if (this.life <= 0){
	        score += (this.level*this.level*10);
	        this.fin = 1;
	        this.drop();
		
	       /*  for (var i = 0; i <= this.level; i++){
				var e = new Explosion();
				var m = new Movement(0, this.movimiento.xActual+rand(-8,8), this.movimiento.yActual+rand(-8,8), 0, 0);
				m.tl = 25;
				e.addMovement(m);
				others[others.length] = e;
	        } */
	}
    
        // si colisiona con el jugador
        if (solapamientoArea(this.area(), jg.area())){
			jg.vida -= 1;
        }
}

// fire bullets
Enemigo.prototype.dispara = function(){
	if (this.fin == 0){
		// get array of bullets that must be fired in the current frame
		var fired = this.patrondisparo.fire();
		
		for (var i = 0; i < fired.length; i++)
		{
			var b = fired[i];
		    
			if (b.homing == 1)
			{
				// homing bullet, recalculate direction
				var xspan = jg.movimiento.xActual-this.movimiento.xActual;
				var yspan = jg.movimiento.yActual-this.movimiento.yActual;
				var newxspan, newyspan;
				
				if (xspan < yspan)
				{
					newxspan = xspan*bg.h/yspan;
					newyspan = bg.h;
				}
				else
				{
					newxspan = bg.w;
					newyspan = yspan*bg.w/xspan;
				}
				
				if (xspan < 0 && yspan < 0)
				{
					newxspan = -newxspan;
					newyspan = -newyspan;
				}
				
				var m = new Movimiento(b.movimiento.velocidad, this.movimiento.xActual+b.movimiento.xInicial,
					     this.movimiento.yActual+b.movimiento.yInicial,
					     this.movimiento.xActual+b.movimiento.xFinal+newxspan,
					     this.movimiento.yActual+b.movimiento.yFinal+newyspan);
				b.movimiento = m;
				
				//playSfx("homingenemyshot", this.level);
			}
			else
			{
				// not homing, enemy position might have changed, so refresh bullet movimiento adding enemy coords
				var m = new Movimiento(b.movimiento.velocidad,
					     this.movimiento.xActual+b.movimiento.xInicial,
					     this.movimiento.yActual+b.movimiento.yInicial,
					     this.movimiento.xActual+b.movimiento.xFinal,
					     this.movimiento.yActual+b.movimiento.yFinal);
			
				b.movimiento = m;

				//playSfx("enemyshot", this.level);
				
			}
		// return bullets    
		bullets[bullets.length] = b;
		}
	}
}
  
// drop powerups
Enemigo.prototype.drop = function()
{
	/* if (this.level == 1) // small fairy
	{
			if (rand(1,10)>3)
			{
				var p = new Powerup('s');
				var rx = rand(-20, 20); var ry = rand(-20, 20);
				p.addMovement(new Movement(1.5, this.movimiento.xActual+rx, this.movimiento.yActual+ry, this.movimiento.xActual+rx, bg.h));
				powerups[powerups.length] = p;
			}
			if (rand(1,10)>5)
			{
				var p = new Powerup('p');
				var rx = rand(-20, 20); var ry = rand(-20, 20);
				p.addMovement(new Movement(1.5, this.movimiento.xActual+rx, this.movimiento.yActual+ry, this.movimiento.xActual+rx, bg.h));
				powerups[powerups.length] = p;
			}
	}
	else if (this.level == 2) // big fairy 
	{
		for (var i = 0; i < 3; i++)
		{
			if (rand(1,10)>2)
			{
				var p = new Powerup('s');
				var rx = rand(-20, 20); var ry = rand(-20, 20);
				p.addMovement(new Movement(1.5, this.movimiento.xActual+rx, this.movimiento.yActual+ry, this.movimiento.xActual+rx, bg.h));
				powerups[powerups.length] = p;
			}
			if (rand(1,10)>4)
			{
				var p = new Powerup('p');
				var rx = rand(-20, 20); var ry = rand(-20, 20);
				p.addMovement(new Movement(1.5, this.movimiento.xActual+rx, this.movimiento.yActual+ry, this.movimiento.xActual+rx, bg.h));
				powerups[powerups.length] = p;
			}
		}
	}
	else if (this.level == 3) // butterflies in MoF 
	{
		for (var i = 0; i < 6; i++)
		{
			if (rand(1,10)>5)
			{
				var p = new Powerup('s');
				var rx = rand(-20, 20); var ry = rand(-20, 20);
				p.addMovement(new Movement(1.5, this.movimiento.xActual+rx, this.movimiento.yActual+ry, this.movimiento.xActual+rx, bg.h));
				powerups[powerups.length] = p;
			}
			if (rand(1,10)>2)
			{
				var p = new Powerup('p');
				var rx = rand(-20, 20); var ry = rand(-20, 20);
				p.addMovement(new Movement(1.5, this.movimiento.xActual+rx, this.movimiento.yActual+ry, this.movimiento.xActual+rx, bg.h));
				powerups[powerups.length] = p;
			}
		}
	}
	else if (this.level == 4) // lily white
	{
		for (var i = 0; i < 10; i++)
		{
			if (rand(1,10)>4)
			{
				var p = new Powerup('s');
				var rx = rand(-20, 20); var ry = rand(-20, 20);
				p.addMovement(new Movement(1.5, this.movimiento.xActual+rx, this.movimiento.yActual+ry, this.movimiento.xActual+rx, bg.h));
				powerups[powerups.length] = p;
			}
			if (rand(1,10)>2)
			{
				var p = new Powerup('p');
				var rx = rand(-20, 20); var ry = rand(-20, 20);
				p.addMovement(new Movement(1.5, this.movimiento.xActual+rx, this.movimiento.yActual+ry, this.movimiento.xActual+rx, bg.h));
				powerups[powerups.length] = p;
			}
		}
	}
	else if (this.level == 5) // final boss
	{
		for (var i = 0; i < 5; i++)
		{
			var p = new Powerup('p');
			var rx = rand(-20, 20); var ry = rand(-20, 20);
			p.addMovement(new Movement(1.5, this.movimiento.xActual+rx, this.movimiento.yActual+ry, this.movimiento.xActual+rx, bg.h));
			powerups[powerups.length] = p;
		}
		for (var i = 0; i < bullets.length; i++)
		{
			var b = bullets[i];
			
			if (b instanceof EnemyBullet)
			{
				var p = new Powerup('s');
				p.addMovement(new Movement(10, b.movimiento.xActual, b.movimiento.yActual, pg.movimiento.xActual, pg.movimiento.yActual));
				powerups[powerups.length] = p;
				bullets.splice(i,1);
			}
		}
		bullets = [];
	} */
}

Enemigo.prototype.update = function()
{
	Sprite.prototype.update.call(this);
	this.dispara();
}