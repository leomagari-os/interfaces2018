//cuatro en linea 
//Declaracion de variables y recursos
let canvas=document.getElementById("juego");
let ctx=canvas.getContext("2d");
//juego
let img1=new Image();
img1.src="images/marioIcon.png";
let img2=new Image();
img2.src="images/yoshiIcon.png";


//boton start 
let mostrarGanador=document.getElementById("panelGanador");
let winner=document.getElementById("ganador");
let btnStart=document.getElementById("btn-start");
let cort=document.getElementById("cortinaFondo");
let reset=document.getElementById("reset");
reset.onclick=()=>{
    location.reload();
}
// fichas
let ficha=new Ficha(50,150,25,img1,"red","f");
let ficha2=new Ficha(50,350,25,img2,"white","1");
img1.onload=()=>{
    ficha.draw(ctx);
};
img2.onload=()=>{
    ficha2.draw(ctx);
};
//ficha seleccionada(puede ser la 1 o la 2)
let fichaSel=null;
//pos del mouse
let pos=null;

//tablero
//test CrearTablero
let tablero=new Tablero();
let tableroPos=tablero.getPos();
let ranuraSize=tablero.getRanuraSize();
let tableroSize=tablero.getTableroSize();

let juego=new Juego("pepe","Cacho");
//conf juego
juego.setFichasPosicionOriginal(ficha,ficha2);
//dibujarTablero
tablero.dibujarTablero(canvas);
tablero.setFichas();
tablero.dibujarFichas(ctx);

//dibujar fichas

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

btnStart.onclick=(ev)=>{
    ev.preventDefault();
    nombreJugador1=document.getElementById("jugador1").value;
    nombreJugador2=document.getElementById("jugador2").value;
    if(nombreJugador1.length>0 && nombreJugador2.length>0 &&nombreJugador1!=nombreJugador2){
        document.getElementById("cortinaFondo").hidden=true;
        document.getElementById("panel-nombres").hidden=true;
        juego=new Juego(nombreJugador1,nombreJugador2);
        ficha=new Ficha(100,150,25,img1,"red",nombreJugador1);
        ficha2=new Ficha(100,350,25,img2,"white",nombreJugador2);
        juego.start();
        dibujarNombres();
    }else{
        showError("Los nombres no pueden ser iguales");
    }
}
function showError(msg){
    let error=document.getElementById("display-error");
    error.innerText=msg;
    error.hidden=false;
}
function limpiarCanvas(){
    ctx=canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function  redibujar(evt){
    pos=getMousePos(canvas, evt);
    ficha2.draw(ctx);
    ficha.draw(ctx);
    if(fichaSel!==null){
        limpiarCanvas();
        tablero.dibujarTablero(canvas);
        tablero.dibujarFichas(ctx);
        fichaSel.setPos(pos);
        ficha2.draw(ctx);
        ficha.draw(ctx);
        dibujarNombres();
    }
    /* let messageActual="";
    if(juego.getTurnoActual()%2){
        messageActual="jugador 1: "+nombreJugador1+" <";
        juego.writeMessage(ctx, messageActual, {x:50,y:100},null);
        message="jugador 2: "+nombreJugador2;
        juego.writeMessage(ctx, message, {x:50,y:300},null) 
    }else{
        messageActual="jugador 2: "+nombreJugador2+" <";
        juego.writeMessage(ctx, messageActual, {x:50,y:300},null) 
        message="jugador 1: "+nombreJugador1;
        juego.writeMessage(ctx, message, {x:50,y:100},null);
        
    } */
   
}
function inicio(){
    ctx.fillStyle="white";
    roundRect(ctx,150,150,canvas.width-300,canvas.height-300,40,true, true);
}
//ui
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  
  }
function dibujarNombres(){
    let messageActual="";
    if(juego.getTurnoActual()%2){
        messageActual="jugador 1: "+nombreJugador1+" <";
        juego.writeMessage(ctx, messageActual, {x:50,y:100},null);
        message="jugador 2: "+nombreJugador2;
        juego.writeMessage(ctx, message, {x:50,y:300},null) 
    }else{
        messageActual="jugador 2: "+nombreJugador2+" <";
        juego.writeMessage(ctx, messageActual, {x:50,y:300},null) 
        message="jugador 1: "+nombreJugador1;
        juego.writeMessage(ctx, message, {x:50,y:100},null);
        
    }
}


canvas.onmousemove=(evt)=>{
    pos=getMousePos(canvas, evt);
    redibujar(evt);
    //moverFicha si fichaSeleccionada!==null
}

document.onmouseup=(ev)=>{
    //fichaSeleccionada.drop();
    //fichaSeleccionada=null;
    //check si Ficha drop esta en ranuraTablero
   //ficha.setPos({x:50,y:50});
    if(fichaSel!==null){
        console.log("se solto la Ficha");
        let posFicha=fichaSel.getPos();
        if(posFicha.x>=tableroPos.x && posFicha.x<=tableroPos.x+tableroSize.width &&
            posFicha.y<=tableroPos.y){
            console.log("en zona de ranuras");
           //colocar ficha en ranura
           
           let posF=null;
           
           if(posFicha.x<=tableroPos.x+(ranuraSize.width)){//ranura 0
            //console.log(tablero.getRanuras());
            let f=new Ficha(0,0,25,fichaSel.getSkin(),fichaSel.getColor(),fichaSel.getNombre());
            
            posF=tablero.insertarFicha(0,f);    
            console.log(posF);  
            posF==null?f=null:
            console.log("pos ranura");
            console.log(tablero.getRanuraPos(0,posF));
            tablero.getRanuras()[0][posF].setPos(tablero.getRanuraPos(0,posF));
            
            console.log(tablero.getRanuras());
           }else{
               if(posFicha.x<=tableroPos.x+(ranuraSize.width*2)){//ranura 1
                let f=new Ficha(0,0,25,fichaSel.getSkin(),fichaSel.getColor(),fichaSel.getNombre());
            
                posF=tablero.insertarFicha(1,f);    
                console.log(posF);  
                posF==null?f=null:
                console.log("pos ranura");
                console.log(tablero.getRanuraPos(1,posF));
                tablero.getRanuras()[1][posF].setPos(tablero.getRanuraPos(1,posF));
            
            console.log(tablero.getRanuras());
                
               }else{
                   if(posFicha.x<=tableroPos.x+(ranuraSize.width*3)){//ranura2
                    let f=new Ficha(0,0,25,fichaSel.getSkin(),fichaSel.getColor(),fichaSel.getNombre());
            
                    posF=tablero.insertarFicha(2,f);    
                    console.log(posF);  
                    posF==null?f=null:
                    console.log("pos ranura");
                    console.log(tablero.getRanuraPos(2,posF));
                    tablero.getRanuras()[2][posF].setPos(tablero.getRanuraPos(2,posF));
                
                console.log(tablero.getRanuras());
                    
                   }else{
                       if(posFicha.x<=tableroPos.x+(ranuraSize.width*4)){//ranura3
                        let f=new Ficha(0,0,25,fichaSel.getSkin(),fichaSel.getColor(),fichaSel.getNombre());
            
                        posF=tablero.insertarFicha(3,f);    
                        console.log(posF);  
                        posF==null?f=null:
                        console.log("pos ranura");
                        console.log(tablero.getRanuraPos(3,posF));
                        tablero.getRanuras()[3][posF].setPos(tablero.getRanuraPos(3,posF));
                        
                        console.log(tablero.getRanuras());
                       }else{
                           if(posFicha.x<=tableroPos.x+(ranuraSize.width*5)){//ranura4
                            let f=new Ficha(0,0,25,fichaSel.getSkin(),fichaSel.getColor(),fichaSel.getNombre());
            
                            posF=tablero.insertarFicha(4,f);    
                            console.log(posF);  
                            posF==null?f=null:
                            console.log("pos ranura");
                            console.log(tablero.getRanuraPos(4,posF));
                            tablero.getRanuras()[4][posF].setPos(tablero.getRanuraPos(4,posF));
                        
                            console.log(tablero.getRanuras());
                           }else{
                               if(posFicha.x<=tableroPos.x+(ranuraSize.width*6)){//ranura5
                                let f=new Ficha(0,0,25,fichaSel.getSkin(),fichaSel.getColor(),fichaSel.getNombre());
            
                                posF=tablero.insertarFicha(5,f);    
                                console.log(posF);  
                                posF==null?f=null:
                                console.log("pos ranura");
                                console.log(tablero.getRanuraPos(5,posF));
                                tablero.getRanuras()[5][posF].setPos(tablero.getRanuraPos(5,posF));
                            
                                console.log(tablero.getRanuras());
                               }else{
                                    let f=new Ficha(0,0,25,fichaSel.getSkin(),fichaSel.getColor(),fichaSel.getNombre());
                
                                    posF=tablero.insertarFicha(6,f);    
                                    console.log(posF);  
                                    posF==null?f=null:
                                    console.log("pos ranura");
                                    console.log(tablero.getRanuraPos(6,posF));
                                    tablero.getRanuras()[6][posF].setPos(tablero.getRanuraPos(6,posF));
                                    
                                    console.log(tablero.getRanuras());
                               }
                           }
                       }
                   }
               }
           }
           if(posF!=null){
                juego.endTurno();
                let ganador=tablero.checkGanador();
                if(ganador!=null){
                    //alert("Gaanador "+ganador);
                    juego.endGame();
                    winner.innerText=ganador;
                    mostrarGanador.hidden=false;
                    cort.hidden=false;
                }
           }else{
                juego.setFichasPosicionOriginal(ficha,ficha2);
           }
           
          
           fichaSel.setPosOriginal();
            limpiarCanvas();
            dibujarNombres();
            tablero.dibujarTablero(canvas);
            tablero.dibujarFichas(ctx);
            fichaSel.draw(ctx);
            //redibujar(ev);
        }
    }
    
    //ficha.draw(ctx);
    //redibujar(ev);
    fichaSel=null;
}
canvas.onmousedown=()=>{
    if(juego.gameStarted()){
        console.log("juego empezado, turno: "+juego.getTurnoActual());
        console.log(ficha.isClicked(pos));
        if(juego.getTurnoActual()%2){
            if(fichaSel==null &&ficha.isClicked(pos)){
                fichaSel=ficha;
                console.log("se selecciono la ficha del jugador 1");
            }
        }else{
            if(fichaSel==null &&ficha2.isClicked(pos)){
                fichaSel=ficha2;
                console.log("se selecciono la ficha del jugador 2");
            }
        }
        
    }else{
        console.log("el juego no empezo");
        juego.start();
    }
   
}
canvas.onclick=()=>{
    //fichaSeleccionada = fichaClicked
    //ficha ficha.drag();
   
    //console.log(ficha.isClicked(pos));
}


//test click ficha


//test dibujarTablero

//test CrearJuego

//test ui
//inicio();