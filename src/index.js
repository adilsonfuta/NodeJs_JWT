const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

const user = {
    id: 1,
    username: 'adilsonfuta',
    email: 'adilsonmariafuta@gmail.com'
};

app.get('/api', (req, res) => {
    res.json({
        message: 'Bem vindo a API'
    });
});


// Middleware verificando o token ao envia-lo

app.post('/api/posts', verificarToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log(err);
            
        } else {
            res.json({
                message: 'Post criado com sucesso',
                authData            
            });           
        }
    })
});

// Formato de token: Authorization: Bearer <token_de_acesso>
// pegando os valores de auth do header   
function verificarToken(req, res, next) {
    const bearerHeader = req.headers['Authorization'];
 
    if (typeof bearerHeader !== 'undefined') {
        const  bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
                     console.log(bearerToken)
        next();
    } else {
        res.sendStatus(403);
    }
}

// rota enviando: token  ao fazer login 
app.post('/api/login', (req, res) => {
    jwt.sign({ user: user }, 'secretkey', (error, token) => {
        res.json({
            token: token
        })

        // podia enviar na localstore para ser usando pelo frontend
    })
});

app.listen('5000', () => console.log('Servidor Inicializado na porta 5000'));