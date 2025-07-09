import express from 'express'
import router from './routes/steamRoutes'

const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})