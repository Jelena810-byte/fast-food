const express = require('express');
const router = express.Router();

//const Menu = require('../models/user.js');
const User = require('../models/user.js');


router.get('/:userId/menu', async (req, res) => {
  try {
    console.log('user menu: hit route path');
    const selectedUser = await User.findById(req.params.userId);
    console.log('jfjalfjaljakfdfslfj')
    if (!selectedUser) throw new Error('User not found');

    const menu = selectedUser.foodMenu; // Array of dishes

    // Pass both user info and menu to the view
    res.render('/')
    // res.render('menu/index.ejs', { menu, user: selectedUser });
  } catch (err) {
    console.error('Error fetching user menu:', err);
    res.redirect('/');
  }
});

router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.render('menu/index.ejs', {
      foodItem: menuItems,
      user: req.session.user
    });
  } catch (err) {
    console.error('Error loading menu:', err);
    res.redirect('/');
  }
});

//router.get('/', async (req, res) => {
  //try {
    //const userId = req.session.user ? req.session.user._id : req.params.userId;

    //if (!userId) return res.redirect('/auth/sign-in');

    //const user = await User.findById(userId);

    //if (!user) return res.send('User not found');

    //res.render('menu/index.ejs', {
      //menuItems: user.foodMenu, 
      //currentUser: req.session.user 
    //});
  //} catch (err) {
    //console.error('Error loading menu:', err);
    //res.redirect('/');
  //}
//});


router.get('/new', (req, res) => {
  const currentUser = req.session.user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.send('Only admin can add a dish.');
  }
  res.render('menu/new.ejs', { user: currentUser });
});


router.post('/', async (req, res) => {
  try {
    const currentUser = req.session.user;
    if (!currentUser || currentUser.role !== 'admin') {
      return res.send('Only admin can add a dish.');
    }

    //await Menu.create(req.body);
    //res.redirect('/menu');
  //} catch (err) {
    //console.error('Error adding dish:', err);
    //res.redirect('/menu');
  //}
//});
const user = await User.findById(currentUser._id);
    user.foodMenu.push(req.body); 
    await user.save();

    res.redirect(`/users/${user._id}/menu`);
  } catch (err) {
    console.error('Error adding dish:', err);
    res.redirect(`/users/${req.session.user._id}/menu`);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const foodItem = await Menu.findById(req.params.id);
    if (!foodItem) return res.send('Dish not found.');

    res.render('menu/show.ejs', { foodItem, user: req.session.user });
  } catch (err) {
    console.error('Error loading dish:', err);
    res.redirect('/menu');
  }
});
router.get('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const foodItem = user.foodMenu.id(req.params.itemId);

    if (!foodItem) throw new Error('Dish not found');

    res.render('menu/show.ejs', { foodItem, currentUser: req.session.user });
  } catch (err) {
    console.error(err);
    res.redirect(`/users/${req.session.user._id}/menu`);
  }
});

router.get('/:itemId/edit', async (req, res) => {
  const currentUser = req.session.user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.send('Only admin can edit a dish.');
  }

  try {
    const user = await User.findById(currentUser._id);
    const foodItem = user.foodMenu.id(req.params.itemId);

    res.render('menu/edit.ejs', { foodItem, userId: user._id });
  } catch (err) {
    console.error(err);
    res.redirect(`/users/${currentUser._id}/menu`);
  }
});

router.put('/:itemId', async (req, res) => {
  try {
    const currentUser = req.session.user;
    if (!currentUser || currentUser.role !== 'admin') {
      return res.send('Only admin can update a dish.');
    }

    const user = await User.findById(currentUser._id);
    const foodItem = user.foodMenu.id(req.params.itemId);

    //if (!foodItem) throw new Error('Dish not found');

    //foodItem.set(req.body);
    //await user.save();

    //res.redirect(`/users/${currentUser._id}/menu`);
    res.redirect(`/users/${req.params.userId}/menu`);
  } catch (err) {
    console.error(err);
    res.redirect(`/users/${req.session.user._id}/menu`);
  }
});

  
router.delete('/:itemId', async (req, res) => {
  try {
    const currentUser = req.session.user;
    if (!currentUser || currentUser.role !== 'admin') {
      return res.send('Only admin can delete a dish.');
    }

    const user = await User.findById(currentUser._id);
    user.foodMenu = user.foodMenu.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    await user.save();

    //res.redirect(`/users/${currentUser._id}/menu`);
     res.redirect(`/users/${req.params.userId}/menu`);
  } catch (err) {
    console.error(err);
    res.redirect(`/users/${req.session.user._id}/menu`);
  }
});



module.exports = router;