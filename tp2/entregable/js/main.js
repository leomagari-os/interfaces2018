//cuatro en linea 
let canvas=document.getElementById("juego");
let ctx=canvas.getContext("2d");
function drawUi(ctx){
    //dibujar rectangulo contenedor de datos del juego
    //NombreJ1,NombreJ2,TurnoActual,PiezasRestantes.
}
//FUNCIONES
function getMousePos(canvas,evt){
    var rect= canvas.getBoundingClientRect();
    return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
    };
}

//let nombreJugador1="";
//let nombreJugador2="";
let btnStart=document.getElementById("btnStart");
btnStart.onclick=(ev){
    ev.preventDefault();
    nombreJugador1=document.getElementById("jugador1").innerText;
    nombreJugador2=document.getElementById("jugador2").val;
}

//TEST
function testDrawFicha(ficha,ctx){
    ficha.draw(ctx);
}

function testIsClickedFicha(ficha,pos){
    console.log(ficha.isClicked(pos));
}

//test dibujo ficha
let ficha=new Ficha(50,50,50,"hola");
let pos=null;
canvas.onmousemove=(evt)=>{
    pos=getMousePos(canvas, evt);
    //moverFicha si fichaSeleccionada!==null
}
document.onmouseup=()=>{
    //fichaSeleccionada.drop();
    //fichaSeleccionada=null;
    //check si Ficha drop esta en ranuraTablero
}
canvas.onclick=()=>{
    //fichaSeleccionada = fichaClicked
    //ficha ficha.drag();
   
    console.log(ficha.isClicked(pos));
}
testDrawFicha(ficha,ctx);

//test click ficha
