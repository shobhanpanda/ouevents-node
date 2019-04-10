const express = require('express')
const User = require('../models/venue')
const router = new express.Router()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/manage', async (req, res) => {
    try {
        const users = await User.find({})
        
        res.render('manage/',{users:users})
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;
