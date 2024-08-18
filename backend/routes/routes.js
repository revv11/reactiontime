const express = require('express');
const router = express.Router();
const {register_post, update_time, get_all} = require('../controllers/controllers')




router.post('/register', register_post)

router.post('/time', update_time)

router.get('/getall', get_all)



module.exports = router;