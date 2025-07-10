const UserModel = require('../models/index').sequelize.models.User

async function getUser(req, res) {
  try {
    const users = await UserModel.findAll()
    const user = users[0]

    return res.send(user)

  } catch (error) {

    return res.send(error)
  }
}

async function createUser(req, res) {
  try {
    const {
      pictureFileName,
      name,
      age,
      street,
      neighborhood,
      UF,
      biography
    } = req.body

    const user = await UserModel.create({
      pictureFileName,
      name,
      age,
      street,
      neighborhood,
      UF,
      biography
    })

    return res.send(user)

  } catch (error) {

    return res.send(error)
  }
}

async function editUser(req, res) {
  try {
    const {
      pictureFileName,
      name,
      age,
      street,
      neighborhood,
      UF,
      biography
    } = req.body

    const users = await UserModel.findAll()
    const user = users[0]

    user.set({
      pictureFileName,
      name,
      age,
      street,
      neighborhood,
      UF,
      biography
    })

    await user.save()

    res.send(user)

  } catch (error) {

    return res.send(error)
  }
}

async function removeUser(req, res) {
  try {
    const users = await UserModel.findAll()
    const user = users[0]

    await user.destroy()

    res.send(user)

  } catch (error) {

    return res.send(error)
  }
}

module.exports = { getUser, createUser, editUser, removeUser }
