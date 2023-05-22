const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  content: {
    memes: [{
      type: Schema.Types.ObjectId,
      ref: 'Meme'
    }],
    gifs: [{
      type: Schema.Types.ObjectId,
      ref: 'Gif'
    }]
  },
  likes: {
    memes: [{
      type: Schema.Types.ObjectId,
      ref: 'Meme'
    }],
    gifs: [{
      type: Schema.Types.ObjectId,
      ref: 'Gif'
    }]
  }
}, {
timestamps: true
})

const UserModel = model('User', UserSchema)

module.exports = UserModel