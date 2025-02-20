import express from "express" //Importando o express, facilidade o protocolo http
import cors from 'cors' // O Cors serve para não problema na conexão entre o front e end, ele deixa qualquer front pegar informações
import { PrismaClient } from "@prisma/client"; //Importando o prismaClient, facilita a interação entre o banco de dados, usando o crud
//Ou seja, ele permite usar o create, read, update e delete.

const prisma = new PrismaClient() //Atribuindo o prisma client em uma var prisma
const app = express() //Mesma coisa com o express
const porta = 3000; //Hospedando o back em localhost:3000


app.use(express.json()) //O express normalmente não usa json, por isso precisamos avisá-lo
app.use(cors()) // HABILITANDO O CORS

//FUNÇÃO POST

app.post('/user', async(req, res) =>{ //é uma promessa, ou seja, vai esperar a conexão para ser cumprida

    await prisma.user.create({ //Cria usando o prisma client.create em user os sequintes dados que devem estar já listados no banco:
        data:{
            email: req.body.email, // ele vem de um requisição, por isso o req, e ele fica guardado no body, precisamos pegá-lo
            name: req.body.name,
            age : req.body.age
        }
    })

    //user.push(req.body)//enviar
    res.status(201).json(req.body) //Caso dê certo o envio ele aparece a mensagem 201
})


//FUNÇÃO GET

app.get('/user', async(req, res) =>{ //é uma promessa, ou seja, vai esperar a conexão para ser cumprida

    const users = await prisma.user.findMany() //ele vai pegar os users cadastrados
    //O findMany() serve para buscar algo no banco de dados, como ele está vazio, busca todos os users
    res.status(200).json(users) //Caso dê certo aparece 200
})


//FUNÇÃO PUT

app.put('/user/:id', async(req, res) =>{ //O id do usuário deve estar na url para poder ser alterado

    await prisma.user.update({ //Vai atualizar a informação
        where:{ //Onde fazer?
            id: req.params.id //no id no qual o id é uma requisição vindo de params
        },
        data:{ //Os dados do banco
            email: req.body.email, 
            name: req.body.name,
            age : req.body.age
        }
    })

    users.push(req.body)//envia de novo, O Prisma cria o usuário diretamente no banco de dados.
    res.status(202).json(req.body)//Caso dê certo aparece 202
})


// FUNCTION DELETE

app.delete('/user/:id', async(req,res) =>{ //Mesma coisa dod PUT, ele pega pelo id
    await prisma.user.delete({ 
        where : {
            id: req.params.id //Qual deletar
        }
    })
    res.status(200).send({message: "Usuário deletado com sucesso"}) //Mensagem
})


//Fazendo a porta funcionar

app.listen(porta, () => { //A porta vai ficar aberta
    console.log(`Servidor rodando na porta ${porta}`);
})

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