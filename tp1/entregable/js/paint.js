colorPickerImg= new Image();
colorPickerImg.src="images/color-picker.png";
colorPickerImg.onload=()=>{
        console.log("colorPicker cargado");
        let ctx= colorPicker.getContext("2d");
        ctx.drawImage(colorPickerImg,0,0);
};
let colorPicker= document.getElementById("color-picker");
let colorPicked=null;
let isClickPressedCP=false;
colorPicker.onmousedown=(evt)=>{
        isClickPressedCP=true;
};
colorPicker.onmousemove= (evt)=>{
        if(isClickPressedCP){
                let mousePos = getMousePos(colorPicker, evt);
        let x=mousePos.x;
        let y=mousePos.y;
        let context = colorPicker.getContext('2d');
        
        context.drawImage(colorPickerImg,0,0);
                        
                        //console.log(oldPos.x +', '+oldPos.y);
                        var data= context.getImageData(x,y,1,1).data;
                        
            let red = data[0];
            let green = data[ 1];
            let blue = data[2];
            let color = 'rgb(' + red + ',' + green + ',' + blue + ')';
            console.log(color);
                colorPicked=color;
                
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI, false);
      context.fillStyle = 'white';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#003300';
      context.stroke();
        }
        
}

let canvas =document.getElementById("lienzo");
                let canvasurl =document.getElementById("lienzourl");
                let lienzo = canvas.getContext("2d");	
                let lienzourl = canvasurl.getContext("2d");
                //------------------------------------------para subir imagen
                let ctx= canvas.getContext("2d");
                let fileIn=document.getElementById("fileIn"); 
                fileIn.onchange=(evt)=>{
                        console.log('cambio');
                        var files = evt.target.files; // FileList object
                        var file = files[0];
                        console.log(file);
                        if(file.type.match('image.*')) {
                                console.log('cargo');
                                var reader = new FileReader();
                                // Read in the image file as a data URL.
                                reader.readAsDataURL(file);
                                reader.onload = function(evt){
                                        console.log('cargo');
                                        if( evt.target.readyState == FileReader.DONE) {
                                                let img= new Image();
                                                img.src = evt.target.result;
                                                img.onload=(ev)=>{
                                                        ctx.drawImage(img,0,0);
                                                };
                                                
                                        }
                                }    

	                } else {
	                  alert("not an image");
	                }
                };
                document.getElementById("btnUrl").addEventListener("click",function (){
                        let src=document.getElementById('url').value;
                        var myHeaders = new Headers();

                        var myInit = { method: 'GET',
                                headers: myHeaders,
                                mode: 'cors',
                                cache: 'default' };
                        fetch(src,myInit)
                        .then(res => res.blob()) // Gets the response and returns it as a blob
                        .then(blob => {
                        // Here's where you get access to the blob
                        // And you can use it for whatever you want
                        // Like calling ref().put(blob)

                        // Here, I use it to make an image appear on the page
                       /*  let objectURL = URL.createObjectURL(blob);
                        let myImage = new Image();
                        myImage.src = objectURL; */
                        var reader = new FileReader();
                                // Read in the image file as a data URL.
                                reader.readAsDataURL(blob);
                                reader.onload = function(evt){
                                        console.log('cargo');
                                        if( evt.target.readyState == FileReader.DONE) {
                                                let img= new Image();
                                                img.src = evt.target.result;
                                                img.onload=(ev)=>{
                                                        ctx.drawImage(img,0,0);
                                                };
                                                
                                        }
                                }
                        });
                        
                        /* let image= new Image();
			let src=document.getElementById('url').value;
                        let url=URL.createObjectURL(src);
			console.log(src);
			console.log('qweqweqwe');
			image=new Image();
                        image.crossorigin="Anonymous";
			image.src= src;//"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
			image.onload=(function(){
                                
                                lienzourl.drawImage(this,10,10);
                                let imageData= canvasurl.toDataURL("image/png");
                                ctx.putImageData(0,0,imageData.width,imageData.height);
                                this.src='';
                                //para evitar cors tengo q crear un imagedata a partir de la imagen
                        }); */
		} );

                var fileinput = document.getElementById('imagenFile');
                fileinput.onchange = function(evt) {
                        console.log('cambio');
                        var files = evt.target.files; // FileList object
                        var file = files[0];
                        if(file.type.match('image.*')) {
                                console.log('cargo');
                                var reader = new FileReader();
                                // Read in the image file as a data URL.
                                reader.readAsDataURL(file);
                                reader.onload = function(evt){
                                        console.log('cargo');
                                        if( evt.target.readyState == FileReader.DONE) {
                                                let img= new Image();
                                                img.src = evt.target.result;
                                                img.onload=(ev)=>{
                                                        ctx.drawImage(img,0,0);
                                                };
                                                
                                        }
                                }    

	                } else {
	                  alert("not an image");
	                }
                };
		
		// TODO: Utilizar el contexto 2D para dibujar
        /*1.Barra de herramientas con, al menos, lápiz y goma de borrar, y su funcionalidad.
        2.Permitir iniciar con un lienzo en blanco, o partir de una imagen que será cargada desde 
        disco (Usar un diálogo para elegir la imagen)
        3. Aplicar al menos cuatro filtros por pixeles a la imagen actual, por ejemplo: negativo, brillo, binarización y sepia.
        4. Aplicar al menos dos de los siguientes filtros a la imagen: Saturación, Suavizado, Detección de Bordes, Blur.
        5. Permitir guardar en disco la imagen, o descartar la imagen y comenzar con un lienzo vacío.*/

        //Trackear mouse sobre canvas
        //evento left click pressed y sobre canvas
        //cambiar Image data en pixel trackeado por pixel color negro
        function getMousePos(canvas,evt){
                var rect= canvas.getBoundingClientRect();
                return {
                        x: evt.clientX - rect.left,
                        y: evt.clientY - rect.top
                };
        }
       

        function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }
      let stack=[];
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }


var isClickPressed= false;
var pencilWidth= 2;
var oldPos=null;
        canvas.onmousedown=()=>{
                console.log(true);
                isClickPressed=true;
                };
        document.onmouseup=()=>{
                console.log(false);
                isClickPressed=false;
                isClickPressedCP=false;
                oldPos=null;
        }
        canvas.onmouseout=()=>{
                oldPos=null;
        }
        canvas.onmouseover=(evt)=>{
                if(isClickPressed){
                let mousePos=getMousePos(canvas,evt);
                oldPos=mousePos;
                }
        }
        let isPencil=null;
        canvas.addEventListener('mousemove', function(evt) {
                if(isClickPressed){
                        var mousePos = getMousePos(canvas, evt);
                        oldPos= oldPos==null? mousePos: oldPos;
                        var context = canvas.getContext('2d');
                        //console.log(oldPos.x +', '+oldPos.y);
                        var pixel= context.getImageData(oldPos.x,oldPos.y,1,1);
                        if(isPencil!==null && isPencil==true){
                                context.beginPath();
                                context.moveTo(oldPos.x,oldPos.y);
                                context.lineTo(mousePos.x,mousePos.y);
                                context.lineCap="round";
                                context.strokeStyle=colorPicked;
                                context.lineWidth=2;
                                context.stroke();
                        } else if(isPencil!==null && isPencil==false){
                                context.beginPath();
                                context.moveTo(oldPos.x,oldPos.y);
                                context.lineTo(mousePos.x,mousePos.y);
                                context.strokeStyle="white";
                                context.lineCap="round";
                                context.lineWidth=25;
                                context.stroke();
                        }
                        
                        oldPos=mousePos;

                }
        
        
      }, false);

      //limpiarLienzo
      var lienzoBGColor="white"
      function limpiarLienzo(){
        console.log("limpiando lienzo con color "+ lienzoBGColor);
        let ctx=canvas.getContext("2d");
        ctx.fillStyle=lienzoBGColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
      }
      document.getElementById("nuevo").addEventListener('click',limpiarLienzo,false);
      function setPencil(){
        isPencil=true;
      }
      document.getElementById("btnPencil").addEventListener('click',setPencil,false);
      function setRubber(){
        isPencil=false;
      }
      document.getElementById("btnRubber").addEventListener('click',setRubber,false);

        