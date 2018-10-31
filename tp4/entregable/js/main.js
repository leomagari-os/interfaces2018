//para el juego hay que detener el comportamiento normal de las teclas
var keys = [];
window.addEventListener("keydown", function(e){
        
        keys[e.keyCode] = true;
        
        switch(e.keyCode)
        {
	case 37: case 39: case 38:  case 40:		// Arrow keys
	case 32:
		e.preventDefault();
		break; 			// Space
	default:
		break;			// do not block other keys
        }
},false);



document.onkeyup = manageKeyUp(e);
document.onkeydown =manageKeyDown(e);

function manageKeyUp(e){
    if (e.keyCode == 37) lf_p = 0;		// left
	else if (e.keyCode == 38) up_p = 0;	// up
	else if (e.keyCode == 39) rg_p = 0;	// right
	else if (e.keyCode == 40) dw_p = 0;	// down
	else if (e.keyCode == 90) sh_p = 0;	// z: shot
	else if (e.keyCode == 88) s2_p = 0;	// x: bombs
	else if (e.keyCode == 67) s3_p = 0;	// c: special
	else if (e.keyCode == 16) sm_p = 0;	// shift: slow
};






function manageKeyDown(e){
    if (e.keyCode == 37) lf_p = 1;		// left
	else if (e.keyCode == 38) up_p = 1;	// up
	else if (e.keyCode == 39) rg_p = 1;	// right
	else if (e.keyCode == 40) dw_p = 1;	// down
	else if (e.keyCode == 90) sh_p = 1;	// z: shot
	else if (e.keyCode == 88) s2_p = 1;	// x: bombs
	else if (e.keyCode == 67) s3_p = 1;	// c: special
	else if (e.keyCode == 16) sm_p = 1;	// shift: slow
}
/* function stop()
{
	clearInterval(interval);
	script_txt.innerHTML = "the game has stopped";
	
	if (document.getElementById('box7').checked) {
		stopMusic();
	}
 }*/