//variables varias
var now = 0;
var score = 0;
var interval = 0;
var currentLevel = 1;

//arreglos de sprites

var bullets = [];
var enemigos = [];
var powerups = [];
var others = [];

//que botones se apretaron

var arr_j = 0;
var ab_j = 0;
var izq_j = 0;
var der_j = 0;
var disp_j = 0;
var ml_j = 0;

//globales
var bg = new Background(550, 600);	 // background global 
var jg = new Jugador();	 // jugador global
var level = new Level();	 // nivel global 
var game= document.getElementById("game");
var gameFx= document.getElementById("gameFx");
var btnPlay= document.getElementById("btn-play");
var otroPlay=document.getElementById("btn-game-over");
//para imprimir en pantalla
var puntajeGame =document.getElementById("puntaje-game");
var puntaje= document.getElementById("puntaje");
var vida= document.getElementById("vida");

//imagenes
var img_pg = document.getElementById('pg');

// enemigos
var img_e1 = document.getElementById('e1');
var img_e2 = document.getElementById('e2');
var img_e3 = document.getElementById('e3');
var img_e4 = document.getElementById('e4');
var img_e6 = document.getElementById('e6');
var img_e7 = document.getElementById('e7');
//balas
var img_bp = document.getElementById('bp');	

//balas enemigos
var img_ex = document.getElementById('ex');

// bullets
var img_b6a = document.getElementById('b6a');
var img_b8a = document.getElementById('b8a');
var img_b8b = document.getElementById('b8b');
var img_b8c = document.getElementById('b8c');
var img_b8d = document.getElementById('b8d');
var img_b8e = document.getElementById('b8e');
var img_b8f = document.getElementById('b8f');
var img_b8g = document.getElementById('b8g');
var img_b8h = document.getElementById('b8h');
var img_b8i = document.getElementById('b8i');
var img_b8j = document.getElementById('b8j');
var img_b16a = document.getElementById('b16a');
var img_b16b = document.getElementById('b16b');
var img_b16c = document.getElementById('b16c');
var img_b16d = document.getElementById('b16d');
var img_b16e = document.getElementById('b16e');
var img_b16f = document.getElementById('b16f');
var img_b16g = document.getElementById('b16g');
var img_b16h = document.getElementById('b16h');
var img_b16i = document.getElementById('b16i');
var img_b16j = document.getElementById('b16j');
	// player sprite
var img_pg_slw = document.getElementById('pg_slw');	



//funcion que maneja todo el juego
function work(){

	// handler jugador
	jg.update();
	// handler enemigos
	 for (var i = 0; i < enemigos.length; i++){
		var o = enemigos[i];
		o.update();
		
		if (o.fin == 1){
			o.element.parentNode.removeChild(o.element);
			enemigos.splice(i, 1);
		}
			
	}
	
	// handler de balas
	for (var i = 0; i < bullets.length; i++){
		var o = bullets[i]; 
		o.update();
		
		if (o.fin == 1){
			o.element.parentNode.removeChild(o.element);
			bullets.splice(i, 1);
		}
			
	}
 
	// spawn de enemigos
	var spawned = this.level.spawn(); 
	
	for (var i = 0; i < spawned.length; i++)
	    enemigos[enemigos.length] = spawned[i];
	
	//imprimo puntaje y vida
	puntaje.innerHTML = score*7;
	puntajeGame.innerHTML = score*7;
	vida.innerHTML = jg.vida;
	if (jg.vida < 1){
		console.log("GAME OVER");
		img_pg.classList.toggle("explosion");
		clearInterval(interval);
		document.getElementById("game-over").style.display="initial";
		document.getElementById("bg-central").style.animationPlayState="paused";
		document.getElementById("bg-central-base").style.animationPlayState="paused";
		bgm.pause();
	}
	        
	// pasa de nivel
	if (powerups.length == 0 && enemigos.length == 0 && bullets.length == 0 && level.finished == 1){
	        currentLevel += 1;
	        start();
	}
				
	
}




//para el juego hay que detener el comportamiento normal de las teclas
var keys = [];
window.addEventListener("keydown", function(e){
        
        keys[e.keyCode] = true;
        
        switch(e.keyCode)
        {
	case 37: case 39: case 38:  case 40:		// flechas
	case 32:
		e.preventDefault();
		break; 			// barra 
	default:
		break;			// para no bloquear las otras
        }
},false);



document.onkeyup = (e)=>
manageKeyUp(e);
document.onkeydown =(e)=>manageKeyDown(e);

function manageKeyUp(e){
    if (e.keyCode == 37) izq_j = 0;		// izq
	else if (e.keyCode == 38) arr_j = 0;	// arriba
	else if (e.keyCode == 39) der_j = 0;	// der
	else if (e.keyCode == 40) ab_j = 0;	// abajo
	else if (e.keyCode == 90) disp_j = 0;	// z: dispara
	else if (e.keyCode == 16) ml_j = 0;	// shift: lento
};






function manageKeyDown(e){
    if (e.keyCode == 37) izq_j = 1;		// izq
	else if (e.keyCode == 38) arr_j = 1;	// arriba
	else if (e.keyCode == 39) der_j = 1;	// der
	else if (e.keyCode == 40) ab_j = 1;	// abajo
	else if (e.keyCode == 90) disp_j = 1;	// z: dispara
	else if (e.keyCode == 16) ml_j = 1;	// shift: lento
}
//si se clickea reinicia el juego
function start(){
	clearInterval(interval);
	let score_ant=score;
	now = 0;
	score = 0;
	
	bg = new Background(550,500);
	jg = new Jugador();
	jg.element=document.getElementById('pg');
	jg.image = null;
	jg.movimiento = new Movimiento(0, bg.w/2, bg.h-50, 0, 0);
	
	bullets = [];
	enemigos = [];
	
	
	//acciones jugador
	arr_j = 0;
	ab_j = 0;
	izq_j = 0;
	der_j = 0;
	disp_j = 0;
	
	
	// handler de nivel
	if (enemigos.length == 0 && bullets.length == 0 && currentLevel == 1){
		level = generateLevel1();		
	}else if (enemigos.length == 0 && bullets.length == 0 && currentLevel == 2){
		clearInterval(interval);
		puntaje.innerHTML = score_ant*7;
		document.getElementById("game-over").style.display="initial";
		document.getElementById("bg-central").style.animationPlayState="paused";
		bgm.pause();

	}
	//inicia el juego
	interval = setInterval(work, 20);
	
}
btnPlay.onclick=(ev)=>{
	ev.preventDefault();
	btnPlay.style.display="none";
	document.getElementById("cont-juego").style.display="block";
	start();
	startMusic();
}
otroPlay.onclick=(ev)=>{
	location.reload(true);
}

//numero random
 function rand(ini, fin){
	return rn = Math.floor(Math.random()*(fin-ini+1))+ini;
}

var bgm =new Audio("audio/bgm_st.mp3");
function startMusic(){
	
	
	var vol = document.getElementById("MusicVolume").value;
	bgm.volume = vol;

	bgm.play();
}
function ChangeMusicVolume(vol) {
	var vol = document.getElementById("MusicVolume").value;
	bgm.volume = vol;
}