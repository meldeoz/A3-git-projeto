const ias = document.querySelectorAll(".ia");
const grid = document.querySelector(".grid-container");
let currentColorIndex = 0;

const colors = ["#9e1111", "#1f6436", "#8c7f10", "#1463a6"]; // replace with the desired colors

grid.style.backgroundColor = colors[currentColorIndex]; // set initial background color

ias.forEach((ia, index) => {
     ia.addEventListener("click", () => {
          currentColorIndex = index % colors.length;
          grid.style.backgroundColor = colors[currentColorIndex];
     });
});


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name');

console.log(name); 



// Selecione o elemento HTML com a classe "user-name"
const userNameElement = document.querySelector(".user-name");

// Atualize o conteúdo do elemento com o valor da variável 'username'
userNameElement.textContent = name;