class Juego{
    constructor(nombre1,nombre2){
        this.turnoActual=0;
        this.ganador=null;
        this.jugador1= new Jugador(nombre1);
        this.jugador2= new Jugador(nombre2);
      
        this.tablero= null;
        this.started=false;
        
    }
    start(){
        console.log("se Inicia el juego con Jugador 1: "+this.jugador1.getNombre()+" , Jugador 2 : "+this.jugador2.getNombre()+".");
        this.started=true;

        this.turnoActual++;
    }
    endTurno(){
        if(this.turnoActual%2){
            console.log("Termina el turno del jugador 1: "+this.jugador1.getNombre());
        }else{
            console.log("Termina el turno del jugador 2: "+this.jugador2.getNombre());
        }

         
        this.turnoActual++;
    }
    endGame(ganador){
        this.ganador;
        console.log(ganador);
    }
    resetGame(tablero){
        this.turnos=0;
        //limpiarTablero
        tablero.limpiarTablero();
    }
    writeMessage(ctx, message, pos,style) {
        ctx.clearRect(pos.xIni, pos.yIni, pos.xEnd, pos.yEnd);
        ctx.font =style.font;// '18pt Calibri';
        ctx.fillStyle = style.color;//'black';
        ctx.fillText(message.text, message.posX,messsage.posY);
    }
    getTurnoActual(){
        return this.turnoActual;
    }
    setTablero(tablero){
        this.tablero=tablero;
    }
    setFichas(j1,j2){
        
    }
    gameStarted(){
        return this.started;
    }
    setFichasPosicionOriginal(fichaJ1,fichaJ2){
        console.log("Se devuelve la ficha a su posicion por falta de lugar en el tablero");
        fichaJ1.setPos({x:50,y:50});
        fichaJ2.setPos({x:50,y:150});
    }
}