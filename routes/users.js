
/* GET users listing. */
const express = require('express')
const User = require('../models/venue')
const router = new express.Router()

router.post('/manage/register', async (req, res) => {
    var firstname     	= req.body.firstname;
	var lastname     	= req.body.lastname;
  
    const user = new User({
    	firstname:firstname,
    	lastname:lastname
    })

    try {
        await user.save()
                  res.location('/manage');
            res.redirect('/manage');
    } catch (e) {
        res.status(400).send(e)

    }
})

router.get('/register', function(req, res, next) {
  res.render('manage/venue_registration');
});



router.get('/venues', async (req, res) => {
    try {
        const users = await User.find({})
        
        res.render('venues/venue-details',{users:users})
    } catch (e) {
        res.status(500).send()
    }
})


// router.get('/manage', async (req, res) => {
//     try {
//         const users = await User.find({})
        
//         res.render('manage/',{users:users})
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.get('/manage/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const venue_user = await User.findById(_id)

        if (!venue_user) {
            return res.status(404).send()
        }
         
         res.render('manage/venue_edit',{venue_user})
    } catch (e) {
        res.status(500).send()
    }
})


// router.get('/register/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const venue_user = await User.findById(_id)

//         if (!venue_user) {
//             return res.status(404).send()
//         }
         
//          res.render('single-venue',{venue_user})
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.post('/manage/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname', 'lastname']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

          const users = await User.find({})
    res.location('/manage');
            res.redirect('/manage');

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;
