import express, { json } from 'express'
import cors from 'cors'

const app = express()

app.use(express(JSON))
app.use(cors())

