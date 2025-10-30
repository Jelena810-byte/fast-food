const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Restaurant = require('../models/restaurant.js'); 


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

router.get('/details', async (req, res) => {
  try {
    console.log('restaurant found:', Restaurant);
    const userId = req.params.userId;

    
    const restaurant = await Restaurant.findOne({ owner: userId });

    if (!restaurant) {
      
      return res.send('No restaurant details found for this user.');
    }

  
    res.render('restaurant/restaurant-details.ejs', { restaurant });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving restaurant details.');
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



//console.log('userId:', UserId);






module.exports = router;
