class Juego{
    constructor(){
        this.turnoActual=0;
        this.ganador=null;
    }
    endTurno(){
        this.turnoActual++;
    }
    endGame(ganador){
        this.ganador;
        console.log(ganador.getNombre());
    }
}