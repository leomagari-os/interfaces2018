class Ficha{
    constructor(){
        this.propietarioName="";
        this.skinId="";
        this.posx=0;
        this.posy=0;
        this.width=50;
        this.height=50;
        this.radio=50;
        this.dragged=false;
    }
    draw(ctx){
        //dibujar ficha en el canvas
    }
    drag(){
        this.dragged=true;
    }
    drop(){
        this.dragged=false;
    }
    setPos(pos){
        this.posx=pos.x;
        this.posy=pos.y;
    }
}