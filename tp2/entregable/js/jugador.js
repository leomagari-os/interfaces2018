class Jugador{
    constructor(){
        this.nombre="";
        this.piezasRestantes=0;
        this.piezaDragged=null;

    }
    setNombre(nombre){
        this.nombre=nombre;
    }
    setPiezaDragged(pieza){
        this.piezaDragged=pieza;
    }
    dropPieza(){
        this.piezaDragged=null;
    }
    getNombre(){
        return this.nombre;
    }
}