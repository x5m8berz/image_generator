const express = require('express')
const router = express.Router()
const {generateimage} = require('../controllers/openaiController')

router.post('/generateimage', (req,res) => {
    generateimage(req,res)
})

module.exports = router