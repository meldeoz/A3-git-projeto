const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const path = require('path');
const cors = require('cors'); // Importe o módulo cors

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (incluindo index.html)
app.use(express.static(path.join(__dirname)));

// Configuração de conexão com o SQL Server
const dbConfig = {
    user: 'sql-adm', // substitua com seu usuário
    password: 'Passw0rd', // substitua com sua senha
    server: 'localhost', // substitua com o nome do servidor
    database: 'DB_AITHERAPIST', // substitua com o nome da base de dados
    options: {
        encrypt: false, // Use criptografia se necessário
        enableArithAbort: true,
    },
};

//Endpoint para autenticar usuario
/*app.get('/login', async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ error: 'Todos os campos são obrigatórios'})
    }

    try{
        // Conecte-se ao banco de dados
        const pool = new sql.ConnectionPool(dbConfig);
        await pool.connect();

        // Verificar se o usuário existe
        const queryCheckUser = `SELECT * FROM tbl_users WHERE user_email = @Email AND user_password = @password`;
        const checkRequest = new sql.Request(pool);
        const checkResult = await checkRequest
            .input('Email', sql.NVarChar, email)
            .query(queryCheckUser);
            
        if (checkResult.recordset.length > 0) {
            pool.close();
            return res.status(400).json({ error: 'Usuário com este e-mail já existe' });
        }
    } 

    catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro no banco de dados' });
    }
})
*/



// Endpoint para cadastrar um novo usuário
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        // Conecte-se ao banco de dados
        const pool = new sql.ConnectionPool(dbConfig);
        await pool.connect();

        // Verificar se o usuário já existe
        const queryCheckUser = `SELECT * FROM tbl_users WHERE user_email = @Email`;
        const checkRequest = new sql.Request(pool);
        const checkResult = await checkRequest
            .input('Email', sql.NVarChar, email)
            .query(queryCheckUser);

        if (checkResult.recordset.length > 0) {
            pool.close();
            return res.status(400).json({ error: 'Usuário com este e-mail já existe' });
        }

        // Inserir o novo usuário
        const queryInsertUser = `INSERT INTO tbl_users (user_name, user_email, user_password) VALUES (@username, @email, @password)`;
        const insertRequest = new sql.Request(pool);
        await insertRequest
            .input('Username', sql.NVarChar, username)
            .input('Email', sql.NVarChar, email)
            .input('Password', sql.NVarChar, password)
            .query(queryInsertUser);

        pool.close();
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no banco de dados' });
    }
});



// Rota para autenticação de usuário
// Rota para autenticar o usuário
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Conectando ao banco de dados
        await sql.connect(dbConfig);

        // Consulta SQL para verificar se o usuário existe
        const queryResult = await sql.query`SELECT * FROM tbl_users WHERE user_email = ${email} AND user_password = ${password}`;
 

        // Verificando se há algum resultado retornado pela consulta
        if (queryResult.recordset.length > 0) {

            const name = queryResult.recordset[0].user_name;

            // Usuário autenticado com sucesso
            res.json({ sucesso: true, mensagem: "Usuário autenticado com sucesso!", name: name });
        } else {
            // Usuário não encontrado ou senha incorreta
            res.json({ sucesso: false, mensagem: "Usuário não encontrado ou senha incorreta.",  });
        }
    } catch (error) {
        // Tratamento de erros
        console.error("Erro ao autenticar usuário:", error.message);
        res.status(500).json({ sucesso: false, mensagem: "Erro ao autenticar usuário." });
    } finally {
        // Fechando a conexão com o banco de dados
        await sql.close();
    }
});





// INICIAR SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
