const express = require('express')
const {postContent, getContent, getContentById} = require('../controllers/content.controller')
const md_auth = require('../middlewares/auth.middleware')

const api = express.Router()

api
  .post('/create-content', postContent)
  .get('/get-content', getContent)
  .get('/get-content/:id', getContentById)

module.exports = api