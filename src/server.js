import express from 'express'
import cors from 'cors'
import fs from 'fs'
import dayjs from 'dayjs'

const app = express()

app.use(express.json());
app.use(cors());

const users = [];
const messages = [];

app.post('/participants', (req,res) => {
    const { name } = req.body

    if (!name){
        res.status(404)
        return
    }
    const user = {name: name, lastStatus: Date.now()}
    users.push(user)
    const message = {from: name,to: "Todos", text: 'entra na sala...', type: 'status', time: dayjs(Date.now()).format('HH:mm:ss')}
    messages.push(message)
    res.status(200)
})

app.get('/participants', (req,res) => {
    res.send(users)
})

app.post('/messages', (req,res) => {
    const {to, text, type} = req.body;
    const from = req.header('User')
    const notEmptyString = to && text
    const typeOfMessage = (type === 'private_message') || (type === 'message' )
    const alreadyAUser = users.find( user => from === user.name)

    if(notEmptyString && typeOfMessage && alreadyAUser){
        res.status(400)
        return
    }

    const message = {from, to, text, type, time: dayjs(Date.now()).format('HH:mm:ss')}
    messages.push(message)
    res.status(200)
})

app.listen(4000, ()=>{
    console.log('Server running on port 4000')
})