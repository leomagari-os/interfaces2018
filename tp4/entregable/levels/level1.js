// para crear el nivel
// se crean enemigos y se les asigna movimientos, 
// patrones de disparo y  un  delay de spawn, y los agrego al nivel.
function generateLevel1(){
	var level = new Level();
	
	var e;
	
	for (var i = 200; i <= 800; i+=50){
		e = crearEnemigo1(i);
		move001(e);
		patronDisparo001(e);
		level.addEnemigo(e);
	}
	
	for (var i = 1200; i <= 1400; i+=20){
		e = crearEnemigo1(i);
		move002a(e);
		patronDisparo002(e);
		level.addEnemigo(e);
	}
	
	for (var i = 1500; i <= 1700; i+=20){
		e = crearEnemigo1(i);
		move002b(e);
		patronDisparo002(e);
		level.addEnemigo(e);
	}
	
	return level;
}


////////////////////////////////////////
// Enemigos
////////////////////////////////////////

function crearEnemigo1(d){
	var e = new Enemigo();
	e.level = 1;
	e.life = 6;
	e.image = img_e1;
	e.delay = d;
	e.id=d;
	e.element= img_e1.cloneNode();
	e.element.id="enemigo-"+e.id;
	game.appendChild(e.element);
	return e;
}

function crearEnemigo2(d){
	var e = new Enemigo();
	e.level = 2;
	e.life = 20;
	e.image = img_e2;
	e.delay = d;
	return e;
}

function crearEnemigo3(d){
	var e = new Enemigo();
	e.level = 3;
	e.life = 40;
	e.image = img_e3;
	e.delay = d;
	return e;
}

function crearEnemigo4(d){
	var e = new Enemigo();
	e.level = 4;
	e.life = 80;
	e.image = img_e4;
	e.delay = d;
	return e;
}


////////////////////////////////////////
// Movimientos
////////////////////////////////////////

function move001(e){
	var rn1 = rand(20, bg.w-20);
	var rn2 = 0;
	var rn3 = rand(50,100);
	
	if (rn1 < bg.w/2) rn2 = rn1+100;
	else rn2 = rn1-100;
	
	e.addMovimiento(new Movimiento(2, rn1, 0, rn1, rn3));
	e.addMovimientoRelacional(new Movimiento(2, 0, 0, rn2, rn3+100));
	e.addMovimientoRelacional(new Movimiento(2, 0, 0, rn1, rn3+100));
	e.addMovimientoRelacional(new Movimiento(2, 0, 0, rn2, rn3));
	e.addMovimientoRelacional(new Movimiento(2, 0, 0, rn2, 0));
}

function move002a(e){
	e.addMovimiento(new Movimiento(3, 0, bg.h-50, bg.w, 100));
}

function move002b(e){
	e.addMovimiento(new Movimiento(3, bg.w, bg.h-50, 0 , 100));
}

function move003(e){
	var rn1 = rand(20, bg.w-20);
	var rn2 = rand(100, bg.w-100);
	
	e.addMovimiento(new Movimiento(1, rn1, 0, rn2, bg.h));
}

function move004(e){	
	var rn1 = rand(20,bg.w-20);
	var rn2 = bg.w-rn1;
	
	var rn3 = 0;
	
	if (rn1 < bg.w/2) rn3 = rand(rn1,bg.w/2);
	else rn3 = rand(bg.w/2,rn1);
	
	var rn4 = bg.w-rn3;
	
	var rnh = rand(100,150);
	
	e.addMovimiento(new Movimiento(1, rn1, 0, rn3, rnh));
	e.addMovimientoRelacional(new Movimiento(1, 0, 0, rn4, rnh));
	e.addMovimientoRelacional(new Movimiento(1, 0, 0, rn2, 0));
}

function move005(e){
	var rn = rand(20, bg.w-20);
	
	e.addMovimiento(new Movimiento(1, rn, 0, rn, 120));
	
	var pausa = new Movimiento(0, 0, 0, 0, 0);
	pausa.tl = 200;
	e.addMovimientoRelacional(pausa);
	e.addMovimientoRelacional(new Movimiento(1, 0, 0, rn, 0));
}

function move006(e){
	var rn1 = rand(20, bg.w-20);
	var rn2 = 0;
	
	if (rn1 < bg.w/2) rn2 = rn1+100;
	else rn2 = rn1-100;
	
	var h = 100;
	e.addMovimiento(new Movimiento(1, rn1, 0, rn1, h));
	
	while (h < bg.h)
	{
		h+=100;
		e.addMovimientoRelacional(new Movimiento(1, 0, 0, rn2, h));
		h+=100;
		e.addMovimientoRelacional(new Movimiento(1, 0, 0, rn, h));
	}
}

function move007(e){
	e.addMovimiento(new Movimiento(1, bg.w/2, 0, bg.w/2, 50));
	
	e.addMovimientoLoop(new Movimiento(1, 0, 0, bg.w/2-50, 150));
	e.addMovimientoLoop(new Movimiento(1, 0, 0, bg.w/2+50, 150));
	e.addMovimientoLoop(new Movimiento(1, 0, 0, bg.w/2, 50));
}


////////////////////////////////////////
//Disparos de enemigos
////////////////////////////////////////

function patronDisparo001(e){
	var s = new PatronDisparo();
	s.ts = 120;
	
	var coords = getCirculo();
	
	for (var i = 0; i < coords.length; i++){
	        var b1 = new EnemyBullet();
			b1.image = img_b8g;
			b1.element = b1.image.cloneNode();
			b1.element.id="bala-e-"+Date.now();
			game.appendChild(b1.element);
	        b1.delay = 100;
	        b1.addMovimiento(new Movimiento(2, 0, 0, (coords[i].x*2), bg.h));
	        s.addBullet(b1);
	}
	
	e.patrondisparo = s;
}

function patronDisparo002(e){
	var s = new PatronDisparo();
	s.ts = 200;
	
	for (var i = 0; i < 6; i++){
		var b1 = new EnemyBullet();
		b1.image = img_b8g;
		b1.element = b1.image.cloneNode();
		b1.element.id="bala-e-"+Date.now();
		game.appendChild(b1.element);
		b1.delay = 10+(i*5);
		b1.homing = 1;
		b1.addMovimiento(new Movimiento(2, 0, 0, -10, bg.w/2));
		
		s.addBullet(b1);
		
		var b2 = new EnemyBullet();
		b2.width = 16; b2.height = 16;
		b2.image = img_b16d;
		b2.element = b2.image.cloneNode();
		b2.element.id="bala-e-"+Date.now();
		game.appendChild(b2.element);
		b2.delay = 20;
		b2.homing = 0;
		b2.addMovimiento(new Movimiento(3, 0, 0, bg.w, bg.h));
		s.addBullet(b2);
	}
	
	e.patrondisparo = s;
}

function patronDisparo003(e){
	var s = new PatronDisparo();
	s.ts = 150;

	for (var i = 0; i < 5; i++){
		var b1 = new EnemyBullet();
		
		if (i == 0){
			b1.image = img_b16i;
			b1.width = 16; b1.height = 16;
		}else{
			b1.image = img_b8h;
		}
		
		b1.element = b1.image.cloneNode();
		b1.element.id="bala-e-"+Date.now();
		game.appendChild(b1.element);
		b1.delay = 100+(i*8);
		b1.addMovimiento(new Movimiento(2, 0, 0, -80, bg.h));
		
		s.addBullet(b1);
		
		var b2 = new EnemyBullet();
		
		if (i == 0){
			b2.image = img_b16i;
			b2.width = 16; b2.height = 16;
		}else{
			b2.image = img_b8h;
		}
		b2.element = b2.image.cloneNode();
		b2.element.id="bala-e-"+Date.now();
		game.appendChild(b2.element);
		b2.delay = 100+(i*8);
		b2.addMovimiento(new Movimiento(2, 0, 0, 0, bg.h));
		
		s.addBullet(b2);
		
		var b3 = new EnemyBullet();
		
		if (i == 0)
		{
			b3.image = img_b16i;
			b3.width = 16; b3.height = 16;
		}else{
			b3.image = img_b8h;
		}
		
		b3.element = b3.image.cloneNode();
		b3.element.id="bala-e-"+Date.now();
		game.appendChild(b3.element);
		b3.delay = 100+(i*8);
		b3.addMovimiento(new Movimiento(2, 0, 0, 80, bg.h));
		
		s.addBullet(b3);
    }
        
    e.patrondisparo = s;
}

