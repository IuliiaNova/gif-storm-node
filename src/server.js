const express = require('express')
const config = require('./config/config')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const errorMiddleware = require('./middlewares/error.middleware')
const fileUpload = require('express-fileupload')

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

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        "'self'",
        "https://dev-yxiaxoiu73blg7k8.us.auth0.com",
        "https://lh3.googleusercontent.com",
      ],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'", "https://www.googletagmanager.com", "https: 'unsafe-inline'"],
      styleSrc: ["'self'", "https: 'unsafe-inline'"],
      connectSrc: [
        "'self'",
        "https://dev-yxiaxoiu73blg7k8.us.auth0.com/oauth/token",
        "https://region1.google-analytics.com"
      ],
      "img-src": ["'self'", "https: data:"],
      upgradeInsecureRequests: [],
    },
  },
}))


module.exports = app;