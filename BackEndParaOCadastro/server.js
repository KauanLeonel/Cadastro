import express from "express"

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const app = express()
const porta = 3000;
app.use(express.json()) //O express normalmente não usa json, por isso precisamos avisá-lo


app.post('/user', async(req, res) =>{

    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age : req.body.age
        }
    })

    users.push(req.body)//enviar
    res.status(201).json(req.body)
})

app.get('/user', async(req, res) =>{

    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.put('/user/:id', async(req, res) =>{

    await prisma.user.uptade({
        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age : req.body.age
        }
    })

    users.push(req.body)//enviar
    res.status(201).json(req.body)
})


app.delete('/user/:id', async(req,res) =>{
    await prisma.user.delete({
        where : {
            id: req.params.id
        }
    })
    res.status(200).send({message: "Usuário deletado com sucesso"})
})
app.listen(porta)

/*
    Bora criar uma API de usuários
    
    Comandos básicos:
    -Criar um usuário;
    -Listar todos os usuários;
    - Modificar o usuário;
    - Apagar um usuário.

    Requests podem ser feitos de várias formas:
    Query params{
        Usa a url. Ex: servidor.com/usuarios?estado=Bahia&nome=Kauan
        as vars são passadas na própria url
    }
    Route params{
        só uma informação:
            get servidor.com/usuarios/22
    }

    body params{
        enviar as informações pelo body.
    }

    Códigos HTTP:
    Com início 2: Deu certo.
    Com início 4: Deu errado pelo lado do cliente.
    Com início 5: Deu erro no servidor.

    BANCO DE DADOS:
    NOME: kauan
    SENHA: TZMF9gETHuRPJA6N
*/