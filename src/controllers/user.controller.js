const db = require('../models')

async function registerLoginUser(req, res) {
  const { user } = req.body
  try {
    const userStored = await db.User.findOne({ userId: user.sub.toString() }).lean().exec()

    if (!userStored) {
      const newUser = new db.User({
        userId: user.sub,
        name: user.given_name || '',
        nickname: user.nickname || '',
        email: user.email
      })

      try {
        const userSaved = await newUser.save()
        return res.status(200).send({ status: 200, user: userSaved })
      } catch (err) {
        if (err.code === 11000) {
          return res.status(501).send({ status: 501, error: err, message: 'Email is already exist' })
        }
        return res.status(500).send({ status: 500, error: err })
      }
    } else {
      return res.status(201).send({ status: 201, user: userStored })
    }

  } catch (err) {
    return res.status(500).send({ status: 500, error: err })
  }
}


module.exports = {
  registerLoginUser
}