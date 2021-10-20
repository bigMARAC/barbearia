const express = require('express')
const cors = require('cors')
const { routes, adminRoutes, authRoutes } = require('./routes')

require('./database')

const app = express()
const port = process.env.APP_PORT || 3000

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(authRoutes)
app.use(adminRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})