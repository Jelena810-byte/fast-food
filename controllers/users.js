const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    //if (!users) return res.redirect('/');

    res.render('users/index.ejs', { users, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);
    if (!selectedUser) return res.redirect('/users');

    res.render('users/show.ejs', {
      user: req.session.user,
      selectedUser
    });
  } catch (err) {
    console.error(err);
    res.redirect('/users');
  }
});







router.get('/:userId/menu', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);
    if (!selectedUser) throw new Error('User not found');

    const menu = selectedUser.foodMenu || [];
    console.log('menu: ', menu)
    console.log('menu length: ', menu.length)

    res.render('menu/index.ejs', { menu, user: req.session.user, selectedUser });
  } catch (err) {
    console.error(err);
    res.redirect('/users');
  }
});





module.exports = router;
