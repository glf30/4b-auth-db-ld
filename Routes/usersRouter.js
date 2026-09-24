const express = require('express')
const router = express.Router()

const { createUser, listUsers, login } = require('../controllers/userController')


router.post('/', createUser)

router.get('/', listUsers)

router.post('/login', login)

module.exports = router