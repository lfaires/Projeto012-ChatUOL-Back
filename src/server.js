import express from 'express'
import cors from 'cors'
import fs from 'fs'
import dayjs from 'dayjs'

const app = express()

app.use(express.json());
app.use(cors());

const users = [];

app.post('/participants', (req,res) => {
    const { name } = req.body

    if (!name){
        res.status(404)
        return
    }
    const user = {name: name, lastStatus: Date.now()}
    users.push(user)
    const msg = {from: name,to: "Todos", text: 'entra na sala...', type: 'status', time: dayjs(Date.now()).format('HH:mm:ss')}
    res.status(200)
})

app.get('/participants', (req,res) => {
    res.send(users)
})

app.listen(4000, ()=>{
    console.log('Server running on port 4000')
})