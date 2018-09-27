class Tablero{
    constructor(){
        this.tablero=[[]];
        this.ranuras=[new Array(0,0,0,0,0,0),
            new Array(0,0,0,0,0,0),
            new Array(0,0,0,0,0,0),
            new Array(0,0,0,0,0,0),
            new Array(0,0,0,0,0,0),
            new Array(0,0,0,0,0,0),
            new Array(0,0,0,0,0,0)];
        this.filas=6;
        this.columnas=7;
        this.crearMatriz();
        this.posX=500;
        this.posY=100;
        this.width=430;
        this.height=365;
        this.color='rgba(0,200,0,0.3)';
        this.ranurawidth=60;
       
    }
    limpiarTablero(){
        this.ranuras=[[0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]];;
    }
    dibujarTablero(canvas){
        let ctx=canvas.getContext("2d");
        console.log("dibujando Tablero...");
        //this.roundRect(ctx,canvas.width-600,canvas.height-480,425,365,30,true, true);
        ctx.fillStyle=this.color;
        this.roundRect(ctx,this.posX,this.posY,this.width,this.height,30);
    }
    insertarFicha(c,ficha){
        for(let f=0;f<this.ranuras[c].length;f++){
            if(this.ranuras[c][f]==0){
                this.ranuras[c][f]=new Ficha(ficha.getPos().x,ficha.getPos().y,ficha.getRadio(),"",ficha.getColor(),ficha.getNombre());
                return  f;
            }
        }
      
        return null;
        
    }
    revisarGanador(){
        //revisar columnas filas y diagonales
        //devolver 0 si no gano nadie 1 si gana el primero y 2 si gana el 2do
    }
    crearMatriz(){
        this.tablero=new Array(this.columnas);
        for (let col = 0; col < this.tablero.length; col++) {
            this.tablero[col]=new Array();
        }
        
        console.log("se creo el tablero");
        console.log(this.tablero);
        console.log("ranuras");
        console.log(this.ranuras);
    }
    getRanuras(){
        return this.ranuras;
    }
    detectarFicha(ficha){
        //se detecta si la ficha esta en alguna ranura y se procede a identificar cual
        let pos=ficha.getPos();
        if(pos.x>=this.posX&& pos.x<=(this.posx+this.width) &&
            pos.y >= this.posY && pos.y<=(this.ranuraHeight+this.posY)){
                //esta en la zona de ranuras, ahora se pasa a ver en cual esta

            }
    }

    //funcion de prueba
    roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == 'undefined') {
            ctx.lineCap="rounded";
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#00f";
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
      //ranuras
      setFichas(){
        let posx=this.posX+8;
        let posy=this.posY+this.height;
        let ranuraColor='green';
        for(let col=0;col<7;col++){
            for(let fil=0;fil<6;fil++){
                //posx=posx+5;
                let ficha=new Ficha(posx,posy-5,27,"cualca",ranuraColor);
                let rad=ficha.getRadio();
                ficha.setPos({x:posx+rad,y:posy-rad-5});
                this.tablero[col].push(ficha);
                posy=posy-60;
              }
              posy=this.posY+this.height;
              posx=posx+60;
            
        }
          
      }
      dibujarFichas(ctx){
        this.tablero.forEach(col=>{
            col.forEach(ficha=>{
                ficha.draw(ctx);
            })  ;
            
        });
        this.ranuras.forEach(col=>{
            col.forEach(ficha=>{
                if (ficha!=0)
                     ficha.draw(ctx);
            })  ;
            
        });
      }
      getPos(){
          return {x:this.posX,y:this.posY};
      }
      getRanuraSize(){
          return {width:this.ranurawidth};
      }
      getTableroSize(){
          return {width:this.width,height:this.height};
      }
      getRanuraPos(col,fil){
          return this.tablero[col][fil].getPos();
      }
      checkGanador(){
          for(var fil=0;fil<this.ranuras[0].length;fil++){
        
            var consecutivas=0;
            var actual=null;
            if(this.ranuras[fil][0]!=0){
                consecutivas=1;
                actual=this.ranuras[fil][0].getNombre();
            }
            console.log("check Vertical");
            for(var f=0;f<this.ranuras[0].length;f++){
                console.log(f);
                if(this.ranuras[fil][f]!=0){
                    if(consecutivas==4){
                        console.log("ganasteeee1 "+actual);
                        return actual;
                    }
                    console.log("no es ganador");
                    if(actual!=null){
                        if(actual==this.ranuras[fil][f].getNombre()){
                            console.log("ganador: "+ consecutivas);
                            consecutivas=consecutivas+1;
                        }else{
                            console.log("ganador: ");
                            consecutivas=1;
                            actual=this.ranuras[fil][f].getNombre();
                        }
                        
                    }else{
                        console.log(this.ranuras[fil][f]);
                        if(this.ranuras[fil][f]){
                            actual=this.ranuras[fil][f].getNombre();
                        }
                        
                    }
            
                }
            }
            //check por fila
            if(this.ranuras[0][fil]!=0){
                consecutivas=1;
                actual=this.ranuras[0][fil].getNombre();
            }
            console.log("check horizontal");
            
            for (let col = 0; col<this.ranuras[fil].length;col++) {
                console.log(fil);
                if(this.ranuras[col][fil]!=0){
                    if(consecutivas==4){
                        console.log("ganasteee2 "+actual);
                        return actual;
                    }
                    console.log("no es ganador");
                    if(actual!=null){
                        if(actual==this.ranuras[col][fil].getNombre()){
                            console.log("ganador: "+ consecutivas);
                            consecutivas=consecutivas+1;
                        }else{
                            console.log("ganador: ");
                            consecutivas=1;
                            actual=this.ranuras[col][fil].getNombre();
                        }
                        
                    }else{
                        console.log(this.ranuras[col][fil]);
                        if(this.ranuras[col][fil]){
                            actual=this.ranuras[col][fil].getNombre();
                        }
                        
                    }
            
                }
                
            }
              
          }  
          console.log("checkeando ganador");
          return null;
      }
}