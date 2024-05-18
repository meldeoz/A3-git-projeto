var radio = document.querySelector('.btn-manual')
var contador = 1

document.getElementById('radio1').checked = true

setInterval(() => {
     proximaImg()
}, 5000);

function proximaImg(){
     contador++
     if(contador > 4){
          contador = 1
     }
     document.getElementById('radio' + contador).checked = true
}