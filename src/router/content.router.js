const express = require('express')
const {postContent, getContent, getContentById, searchContent, deleteContentById} = require('../controllers/content.controller')
const md_auth = require('../middlewares/auth.middleware')

const api = express.Router()

api
  .post('/create-content', postContent)
  .get('/get-content', getContent)
  .get('/memes/:id', getContentById)
  .get('/gifs/:id', getContentById)
  .get('/search-content/:query', searchContent)
  .delete('/memes/:id', deleteContentById)



module.exports = api