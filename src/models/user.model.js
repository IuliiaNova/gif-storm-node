const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  content: [{
      type: Schema.Types.ObjectId,
      ref: 'Content'
    }],
  likes: [{
      type: Schema.Types.ObjectId,
      ref: 'Content'
    }]
}, {
timestamps: true
})

const UserModel = model('User', UserSchema)

module.exports = UserModel