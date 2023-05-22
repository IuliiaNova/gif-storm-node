const express = require('express')
const config = require('./config/config')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const errorMiddleware = require('./middlewares/error.middleware')
const fileUpload = require('express-fileupload')

const userRoutes = require('./router/user.router')

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:4000']
}))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
    limits: { fileSize: 15000000 }, // 15MB max file(s) size
    abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
  })
)

app.use(helmet())
app.use(helmet({ crossOriginEmbedderPolicy: true }))

app.use(`/api/${config.app.API_VERSION}`, userRoutes)

app.use(errorMiddleware)

module.exports = app;