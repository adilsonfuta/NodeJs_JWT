const express=require('express');
const jwt=require('jsonwebtoken');


const app=express();

app.get('/api',(req,res)=>{

    res.json({
        message:'Bem vindo a API'
    });
 

});

app.listen('5000',()=> console.log('Servidor Inicializado na porta 5000'));