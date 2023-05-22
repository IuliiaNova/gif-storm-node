const mongoose = require('mongoose') 
const server = require('./server')
const config = require('./config/config')
//const seeder = require('./db/seeder')

try{
  mongoose.connect(config.db.MONGO_URL)
  server.listen(config.app.PORT, async () => {
    //await seeder.seedMemes
    //await seeder.seedGifs
    console.log(`Running on ${config.db.URL}...`)
  })
} catch (error) {
  throw new Error()
}