import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'

const app = express()

app.use(cors())

app.use((req, res, next) => {})

app.get('/*', async (req, res) => {})

app.listen(1338, () => {
  console.log(`Server is running on port 1338`)
})
