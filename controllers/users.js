const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.render('users/index.ejs', { users });
//   } catch (err) {
//     console.error(err);
//     res.redirect('/');
//   }
// });




router.get('/:userId/menu', async (req, res) => {
  try {
    console.log('hit route path')
    const selectedUser = await User.findById(req.params.userId);

    if (!selectedUser) throw new Error('User not found');

    
    const menu = selectedUser.foodMenu;

    
    res.render('menu/index.ejs', { menu: foodItem});
  } catch (err) {
    console.error('Error fetching user menu:', err);
    res.redirect('/users');
  }
});


router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.redirect('/users');
    }

  
    //const menu = await User.find({ owner: user._id });

    res.render('users/show.ejs', { user, menu: user.foodMenu });
  } catch (err) {
    console.error(err);
    res.redirect('/users');
  }
});



module.exports = router;
