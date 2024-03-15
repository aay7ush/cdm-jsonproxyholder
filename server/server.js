import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'

const app = express()

app.use(cors())

app.use((req, res, next) => {
  res.set('x-codedamn-project', 'jsonproxyholder')
  next()
})

app.get('/*', async (req, res) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com${req.url}`)

  if (response.ok) {
    const data = await response.json()
    res.json(data)
  } else {
    res.status(response.status).json({ error: 'Failed to fetch data' })
  }
})

app.listen(1338, () => {
  console.log(`Server is running on port 1338`)
})
