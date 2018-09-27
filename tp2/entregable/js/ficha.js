class Ficha{
    constructor(posx,posy,radio,skin,color,nombre){
        this.propietarioName=nombre;
        this.skinId=null;
        this.color=color;
        this.posOriginal={x:posx,y:posy};
        this.posx=posx;
        this.posy=posy;
        this.width=radio*2;
        this.height=radio*2;
        this.radio=radio;
        this.dragged=false;
    }
    draw(ctx){
        //dibujar ficha en el canvas
        ctx.beginPath();
        ctx.arc(this.posx,this.posy,this.radio,0,2*Math.PI);
        ctx.fillStyle=this.color;
        ctx.lineCap="rounded";
        ctx.strokeStyle = "#00f";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    isClicked(pos){
        return (Math.pow(pos.x-this.posx,2)+Math.pow(pos.y-this.posy,2) < Math.pow(this.radio,2));
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
    getRadio(){
        return this.radio;
    }
    getPos(){
        return {x:this.posx,y:this.posy};
    }
    setPosOriginal(){
        this.setPos(this.posOriginal);
    }
    getColor(){
        return this.color;
    }
    getFicha(){
        return this;
    }
    getNombre(){
        return this.propietarioName;
    }
}