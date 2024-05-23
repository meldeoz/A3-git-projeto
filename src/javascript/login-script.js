const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
     container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
     container.classList.remove("active");
});

//////// REQUISICAO CADASTRO //////

async function cadastrarUser() {
    

     const formData = document.getElementById("registerForm")
     const username = formData.elements["username"].value;
     const email = formData.elements["email"].value;
     const password = formData.elements["password"].value;

     console.log(username)
     console.log(email)
     console.log(password)

     try {
         const response = await fetch('http://localhost:3000/register', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ username, email, password }),
         });

         const data = await response.json();

         if (response.ok) {
             alert('Usuário cadastrado com sucesso!');
             container.classList.remove("active");

         } else {
             alert(`Erro: ${data.error}`);
         }
     } catch (error) {
         console.error('Erro:', error);
         alert('Ocorreu um erro ao cadastrar o usuário.');
     }
 };



 /////// REQUISICAO LOGIN //////

 async function autenticarUser() {

     
     const formData = document.getElementById("loginForm")
     const email = formData.elements["email"].value;
     const password = formData.elements["password"].value;

     console.log(email)
     console.log(password)

     try {
          const response = await fetch('http://localhost:3000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();
          console.log(data.sucesso )
          if (response.ok) {
              console.log("Sucesso:", data.mensagem);

              if(data.sucesso === true){
                    console.log(data.name)
                    window.location.href = `ia-selection.html?name=${data.name}`;   

              }
              // Redirecionar o usuário para outra página ou realizar outra ação após a autenticação bem-sucedida
          } else {
              console.error("Erro:", data.mensagem);
              // Exibir uma mensagem de erro para o usuário
          }
      } catch (error) {
          console.error("Erro ao realizar a requisição:", error);
          // Tratar erros de rede ou outros erros
      }

 };