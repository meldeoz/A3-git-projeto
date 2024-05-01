const botoes = document.querySelectorAll(".botao");
const ias = document.querySelectorAll(".ia");

botoes.forEach((botao, indice) => {
     botao.addEventListener("click", () => {
          desselecionarBotao();
          desselecionaria();

          botao.classList.add("selecionado");
          ias[indice].classList.add("selecionado");
     });
});

function desselecionaria() {
     const iaSelecionado = document.querySelector(".ia.selecionado");
     iaSelecionado.classList.remove("selecionado");
}

function desselecionarBotao() {
     const botaoSelecionado = document.querySelector(".botao.selecionado");
     botaoSelecionado.classList.remove("selecionado");
}

const botaoLogin = document.querySelector(".btn.entrar")
botaoLogin.addEventListener("click", () => {
     location.href = "\login.html"
})


