const express = require('express');
const router = express.Router({ mergeParams: true});

//const Menu = require('../models/user.js');
const User = require('../models/user.js');




router.get('/', async (req, res) => {
  try {
   const selectedUser = await User.findById(req.params.userId);
    if (!selectedUser) throw new Error('/');

    res.render('menu/index.ejs', { 
      menu: selectedUser.foodMenu || [],
      user: req.session.user,
      selectedUser,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});



router.get('/new', async (req, res) => {
  const currentUser = await req.session.user;
  //console.log('user role', currentUser)
  if (!currentUser || currentUser.role !== 'admin') {
  
 return res.send('Only admin can add a dish.');
  };
  res.render('menu/new.ejs', { user: currentUser })
});

router.get('dish/:dishId', async (req, res) => {
  const currentUser = req.session.user;
  const foundDish = await Menu.findById(req.params.menuId)
  console.log('dish found', foundDish)
  if (!currentUser || currentUser.role !== 'admin') {
 return res.send('Only admin can add a dish.');
  };
  res.render('menu/show.ejs', { user: currentUser, menu: foundDish })
});

// router.post('/new', (req, res) => {
//   console.log('get dish post route')
// })

router.post('/', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);
    if (!selectedUser) return res.redirect('/');

    selectedUser.foodMenu.push(req.body); 
    await selectedUser.save();
    res.redirect(`/users/${selectedUser._id}/menu`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

  

router.get('/:menuId/edit', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);
    const menuItem = selectedUser.foodMenu.id(req.params.menuId);
    res.render('menu/edit.ejs', { menuItem, user: req.session.user, userId: req.params.userId });
  } catch (err) {
    console.error(err);
    res.redirect('/users/${req.params.userId}/menu');
  }
});


//router.get('/:menuId/edit', async (req, res) => {
  //try {
    //const selectedUser = await User.findById(req.params.userId);
    //const menuItem = selectedUser.foodMenu.id(req.params.menuId);

    //if (!menuItem) return res.send('Menu item not found.');

    //res.render('menu/edit.ejs', {
      //menuItem,
      //user: req.session.user,
      //userId: req.params.userId,
    //});
  //} catch (err) {
    //console.error(err);
    //res.redirect('/');
 // }
//});

router.get('/:menuId', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);
    //console.log(selectedUser)
    const menuItem = selectedUser.foodMenu.id(req.params.menuId);

    if (!menuItem) throw new Error('Menu item not found');

    res.render('menu/show.ejs', {
      user: req.session.user,
      selectedUser: selectedUser,
      menuItem
    });
  } catch (err) {
    console.error(err);
    res.redirect(`/users/${req.params.userId}/menu`);
  }
});

router.put('/:menuId', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);
    const menuItem = selectedUser.foodMenu.id(req.params.menuId);

    if(!menuItem) return res.send('Menu item not found.');

    menuItem.set(req.body);
    await selectedUser.save();
    res.redirect(`/users/${selectedUser._id}/menu`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});


  
router.delete('/:itemId', async (req, res) => {
  try {
    const currentUser = req.session.user;
    if (!currentUser || currentUser.role !== 'admin') {
      return res.send('Only admin can delete a dish.');
    }


    const selectedUser = await User.findById(req.params.userId);
    selectedUser.foodMenu = selectedUser.foodMenu.filter(
      (item) => item._id.toString() !== req.params.menuId
    );
    await selectedUser.save();

    res.redirect(`/users/${req.params.userId}/menu`);
  } catch (err) {
    console.error(err);
    res.redirect(`/users/${req.params.userId}/menu`);
  }
});

    //const user = await User.findById(currentUser._id);
    //SelectedUser.foodMenu = selectedUser.foodMenu.filter(
      //(item) => item._id.toString() !== req.params.itemId
    //);
    //await selectedUser.save();

     //res.redirect(`/users/${req.params.userId}/menu`);
  //} catch (err) {
    //console.error(err);
    //res.redirect('/');
  //}
//});



module.exports = router;