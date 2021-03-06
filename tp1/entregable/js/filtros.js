
var matrices={
  "blur":[[1,2,1],
          [2,4,2],
          [1,2,1]],
  "deteccionDeBordes":[[0,1,0],
                      [1,-4,1],
                      [0,1,0]]
}
function Filtro() {
  //matrices de convolucion para los filtros que la necesitan
  this.matrizBlur=[[1,2,1],
          [2,4,2],
          [1,2,1]];
  this.matrizDeteccionDeBordes=[[0,1,0],
                                [1,-4,1],
                                [0,1,0]];
  this.canvas=[];
  this.ctx=[];
  this.ctxOriginal=document.getElementById("lienzo");
  this.getRGB=function(imd,x,y){
      var red,green,blue;
      index=((x+y*imd.width)*4);
      red=imd.data[index+0];
      green=imd.data[index+1];
      blue=imd.data[index+1];
      return colors={"red":red,"green":green,"blue":blue};
  };
  //para los filtros en los que hace falta utilizar matrices de convolucion
  this.convolucion= function(matriz,offset,ctx,imd) {
    var m = [].concat(matriz[0], matriz[1], matriz[2]); //convierte la matriz en un arreglo de una dimension
    var divisor = m.reduce(function(a, b) {
      return a + b;
    }) || 1; // sum
    var imdOriginalData=imd.data;
    var imdNuevo=ctx.createImageData(imd);
    var imdNuevoData= imdNuevo.data;
    var length= imdNuevoData.length;
    var res = 0;

    for (var i = 0; i < length; i++) {

      if ((i + 1) % 4 === 0) {
        imdNuevoData[i] = imdOriginalData[i];
        continue;//cada vez que llega al canal alpha saltea un ciclo
      }
      res = 0;
      var matImagen = [//matriz imagen
        imdOriginalData[i-imd.width*4-4] || imdOriginalData[i],
        imdOriginalData[i-imd.width*4] || imdOriginalData[i],
        imdOriginalData[i-imd.width*4+4] || imdOriginalData[i],
        imdOriginalData[i-4] || imdOriginalData[i],
        imdOriginalData[i],
        imdOriginalData[i+4] || imdOriginalData[i],
        imdOriginalData[i+imd.width*4-4] || imdOriginalData[i],
        imdOriginalData[i+imd.width*4] || imdOriginalData[i],
        imdOriginalData[i+imd.width*4+4] || imdOriginalData[i]
      ];
      for (var j = 0; j < 9; j++) {
        res+=matImagen[j]*m[j];//matriz de convolucion mult matriz imagen
      }
      res/=divisor;
      if(offset) {
        res+=offset;
      }

      imdNuevoData[i] = res;//reemplaza al pixel por el resultado de la ecuacion

    }

    ctx.putImageData(imdNuevo, 0, 0);
  };



   
    
  //FILTROS
  this.blancoYNegro=function(ctx,imd){
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var colors=this.getRGB(imd,x,y);
        var tono=parseInt((colors.red+colors.green+colors.blue)/3);
        var i=((x+y*imd.width)*4);
        imd.data[i+0]=tono;
        imd.data[i+1]=tono;
        imd.data[i+2]=tono;
      }
    }
    ctx.putImageData(imd,0,0);
  };
  this.binarizacion=(ctx,imd)=>{
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var colors=this.getRGB(imd,x,y);
        var tono=parseInt((colors.red+colors.green+colors.blue)/3);
        tono=tono>127?255:0;
        var i=((x+y*imd.width)*4);
        imd.data[i+0]=tono;
        imd.data[i+1]=tono;
        imd.data[i+2]=tono;
      }
    }
    ctx.putImageData(imd,0,0);
  };
  this.brillo=(ctx,imd,ajuste)=>{
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var i=((x+y*imd.width)*4);
        imd.data[i+0]+=ajuste;
        imd.data[i+1]+=ajuste;
        imd.data[i+2]+=ajuste;
      }
    }
    ctx.putImageData(imd,0,0);
  };
  this.saturacion=(ctx,imd,ajuste)=>{
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var i=((x+y*imd.width)*4);
        var colors=this.getRGB(imd,x,y);
        var hsv= RGBtoHSV ([colors.red,colors.green,colors.blue]);
        hsv[1] *= 0.8;
        var rgb= HSVtoRGB(hsv);
        imd.data[i+0]=rgb[0];
        imd.data[i+1]=rgb[1];
        imd.data[i+2]=rgb[2];
      }
    }
    
  }
  this.negativo=function(ctx,imd){
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var colors=this.getRGB(imd,x,y);
        var i=((x+y*imd.width)*4);
        imd.data[i+0]=255-colors.red;
        imd.data[i+1]=255-colors.green;
        imd.data[i+2]=255-colors.blue;
      }
    }
    ctx.putImageData(imd,0,0);
  };
  this.sepia=function(ctx,imd){
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var colors=this.getRGB(imd,x,y);
        var i=((x+y*imd.width)*4);
        imd.data[i+0]=( colors.red * .393 ) + ( colors.green * .769 ) + ( colors.blue * .189 );
        imd.data[i+1]= ( colors.red * .349 ) + ( colors.green * .686 ) + ( colors.blue * .168 );
        imd.data[i+2]=( colors.red * .272 ) + ( colors.green * .534 ) + ( colors.blue * .131 );
      }
    }
    ctx.putImageData(imd,0,0);
  };
  this.transparencia=function(ctx,imd){
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var i=((x+y*imd.width)*4);
        imd.data[i+3]-=80;
      }
    }
    ctx.putImageData(imd,0,0);
  };
  this.blur=function(matriz,ctx,imd){

    this.convolucion(matriz,0,ctx,imd);

  };
  this.deteccionDeBordes=function(matriz,ctx,imd){
    this.convolucion(matriz,0,ctx,imd);
  }

}

var canvasOriginal= document.getElementById("lienzo");
var ctxOriginal= document.getElementById('lienzo').getContext("2d");
let imgOriginal=canvasOriginal;
 function previewFiltro(){
   var herramientaFiltro= new Filtro();
   herramientaFiltro.cargarCanvas(imgOriginal);
}

document.getElementById("btnByN").onclick=function(ev){
  ev.preventDefault();
  ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
  var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
  var herramientaFiltro=new Filtro();
  herramientaFiltro.blancoYNegro(ctxOriginal,imageData);
};
document.getElementById("btnBrillo").onclick=function(ev){
  ev.preventDefault();
  ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
  var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
  var herramientaFiltro=new Filtro();
  ajuste =10;
  herramientaFiltro.brillo(ctxOriginal,imageData,ajuste);
};
  document.getElementById("btnBinarizacion").onclick=function(ev){
    ev.preventDefault();
    ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
	  var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro=new Filtro();
    herramientaFiltro.binarizacion(ctxOriginal,imageData);
  };
  document.getElementById("btnNegativo").onclick=function(ev){
    ev.preventDefault();
    ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro=new Filtro();
    herramientaFiltro.negativo(ctxOriginal,imageData);
  };
  document.getElementById("btnSepia").onclick=function(ev){
    ev.preventDefault();
	  ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro=new Filtro();
    herramientaFiltro.sepia(ctxOriginal,imageData);
  };
  document.getElementById("btnSaturacion").onclick=function(ev){
    ev.preventDefault();
	  ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro=new Filtro();
    ajuste=1.5;
    herramientaFiltro.saturacion(ctxOriginal,imageData,ajuste);
  };
  document.getElementById("btnSuavizado").onclick=function(ev){
    ev.preventDefault();
	  ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro=new Filtro();
    herramientaFiltro.transparencia(ctxOriginal,imageData);
  };
  document.getElementById("btnBlur").onclick=function(ev){
    ev.preventDefault();
    ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro= new Filtro();
    herramientaFiltro.blur(matrices.blur,ctxOriginal,imageData);
  };
  document.getElementById("btnDeteccion").onclick=function(ev){
    ev.preventDefault();
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro= new Filtro();
    herramientaFiltro.deteccionDeBordes(matrices.deteccionDeBordes,ctxOriginal,imageData);

  };

//para filtro de saturacion
  RGBtoHSV= function(color) {
    var r,g,b,h,s,v;
    r= color[0];
    g= color[1];
    b= color[2];
    min = Math.min( r, g, b );
    max = Math.max( r, g, b );


    v = max;
    delta = max - min;
    if( max != 0 )
        s = delta / max;        // s
    else {
        // r = g = b = 0        // s = 0, v is undefined
        s = 0;
        h = -1;
        return [h, s, undefined];
    }
    if( r === max )
        h = ( g - b ) / delta;      // between yellow & magenta
    else if( g === max )
        h = 2 + ( b - r ) / delta;  // between cyan & yellow
    else
        h = 4 + ( r - g ) / delta;  // between magenta & cyan
    h *= 60;                // degrees
    if( h < 0 )
        h += 360;
    if ( isNaN(h) )
        h = 0;
    return [h,s,v];
};

HSVtoRGB= function(color) {
    var i;
    var h,s,v,r,g,b;
    h= color[0];
    s= color[1];
    v= color[2];
    if(s === 0 ) {
        // achromatic (grey)
        r = g = b = v;
        return [r,g,b];
    }
    h /= 60;            // sector 0 to 5
    i = Math.floor( h );
    f = h - i;          // factorial part of h
    p = v * ( 1 - s );
    q = v * ( 1 - s * f );
    t = v * ( 1 - s * ( 1 - f ) );
    switch( i ) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:        // case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [r,g,b];
}




