

let navFiltros=document.getElementById("navFilters");
let contArchivo=document.getElementById("contArchivo");
let contFB=document.getElementById("contBasicFilters");
let contFA=document.getElementById("contAdvancedFilters");
let separadores=document.getElementsByClassName("separador");
let subirImagen=document.getElementById("btnSubirImagen");
let panelSubida=document.getElementById("panelSubirImg");
let cortinaFondo=document.getElementById("cortinaFondo");
let cancelar=document.getElementById("cancelar");
for (let i = 0; i < separadores.length; i++) {
    const separador = separadores[i];
    separador.addEventListener('click',(evt)=>{
        console.log(i);
        navFiltros.style.display="block";
        if(i==0){
            contFA.style.display="none";
            contFB.style.display="none";
            contArchivo.style.display="initial";
        }else if(i==1){
            contFA.style.display="none";
            contFB.style.display="initial";
            contArchivo.style.display="none";
        }else{
            contFA.style.display="initial";
            contFB.style.display="none";
            contArchivo.style.display="none";
        }
        
        },false);
}
subirImagen.onclick=()=>{
    panelSubida.style.display="initial";
    cortinaFondo.style.display="initial";
}   
cancelar.onclick=()=>{
    panelSubida.style.display="none";
    cortinaFondo.style.display="none";
}