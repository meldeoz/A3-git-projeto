var opcao = 1;



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






///////



async function enviarMensagem() {
    var mensagem;
    var mensagem1 = document.getElementById('input-mensagem').value;
    if (opcao==1){
    mensagem = "chat seu nome é luizo um especialista em conselhos amorosos, atue como tal apartir da mensagem que vou enviar agora:  "+document.getElementById('input-mensagem').value;
    
    }
    else if (opcao==2){
        mensagem = "chat seu nome é Magda um especialista em conselhos familiares, atue como tal apartir da mensagem que vou enviar agora:  "+document.getElementById('input-mensagem').value;
    }
    else if (opcao==3){
        mensagem = "chat seu nome é Joaquim um especialista em conselhos sobre amizade, atue como tal apartir da mensagem que vou enviar agora:  "+document.getElementById('input-mensagem').value;
    }

    else if (opcao==4){
        mensagem = "chat seu nome é Vera um especialista em conselhos sobre assuntos gerais, atue como tal apartir da mensagem que vou enviar agora:  "+document.getElementById('input-mensagem').value;
    }

    console.log(mensagem);

    try {
        const response = await fetch('http://localhost:2000/pergunte-ao-psicologo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: mensagem }),
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data.text1);

        showHistory(mensagem1,data.text1)

        document.getElementById('input-mensagem').value = "";

        

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao cadastrar o usuário.');
    }

    
}


function showHistory(message, resposta){
    var historic = document.getElementById('historic')


    //mensagens do usuario
    
    var boxMyMessage = document.createElement('div')
    boxMyMessage.className = 'box-my-message'

    var myMessage = document.createElement('p')
    myMessage.className = 'my-message'
    myMessage.innerHTML = message

    boxMyMessage.appendChild(myMessage)
    historic.appendChild(boxMyMessage)


    //mensagens do chatgpt

    var boxResponseMessage = document.createElement('div')
    boxResponseMessage.className = 'box-response-message'

    var chatResponse = document.createElement('p')
    chatResponse.className = 'chat-message'
    chatResponse.innerHTML = resposta

    boxResponseMessage.appendChild(chatResponse)
    historic.appendChild(boxResponseMessage)

}



function luizo(){
    opcao = 1;

    var historic = document.getElementById('historic');
    historic.innerHTML = '';

}
function magda(){
    opcao = 2;

    var historic = document.getElementById('historic');
    historic.innerHTML = '';

}

function joaquim(){
    opcao = 3;

    var historic = document.getElementById('historic');
    historic.innerHTML = '';

}
function vera(){
    opcao = 4;

    var historic = document.getElementById('historic');
    historic.innerHTML = '';

}
