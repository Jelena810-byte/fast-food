const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    //if (!users) return res.redirect('/');

    res.render('users/show.ejs', { users });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});




router.get('/:userId/menu', async (req, res) => {
  try {
    //console.log('user menu: hit route path')
    const selectedUser = await User.findById(req.params.userId);
    console.log(selectedUser.role)
    if (!selectedUser) throw new Error('User not found');

    //const menu = selectedUser.foodMenu;

    //res.render('users/show.ejs', {  menu, user: req.session.user});
    res.render('users/show.ejs', {
      user: selectedUser, // ✅ this is what your EJS expects
    });
  } catch (err) {
    console.error('Error fetching user menu:', err);
    res.redirect('/');
 }
});


//router.get('/:userId', async (req, res) => {
  //try {
    //const selectedUser = await User.findById(req.params.userId);

    //if (!selectedUser) {
      //return res.redirect('/');
    //}

  
    //const menu = await User.find({ owner: user._id });
     //const menu = selectedUser.foodMenu
    //res.render('users/show.ejs', { user: selectedUser, menu });
  //} catch (err) {
    //console.error(err);
    //res.redirect('/users');
      //res.redirect('/');
  //}
//});

router.get('/:userId/menu', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);
    if (!selectedUser) throw new Error('User not found');

    const menu = selectedUser.foodMenu;
    res.render('menu/index.ejs', { menu, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});


module.exports = router;
