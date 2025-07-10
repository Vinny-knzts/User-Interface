const express = require('express')
const fs = require('fs')
const { getUser, createUser, editUser, removeUser } = require('../controllers/userController')
const upload = require('../middlewares/upload')

const router = express.Router()

router.get('/', getUser)
router.post('/', createUser)
router.put('/', editUser)
router.delete('/', removeUser)
router.post('/image', upload.single('picture'), (req, res) => res.send(req.file.filename))
router.put('/image', (req, res) => {
  const path = ('src/public/uploads/')
  const { savedPictureFileName } = req.body

  console.log(savedPictureFileName)

  fs.readdir(path, (err, files) => {
    files.forEach(file => {
      if (file != savedPictureFileName && file != 'default_user.jpg') {
        fs.unlink(path + file, (err) => {
          if (err) console.log(err)
        })
      }
    })
  })

  return res.send('ok')
})

module.exports = router
