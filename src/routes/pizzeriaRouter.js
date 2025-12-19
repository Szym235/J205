const express = require('express');
const router = express.Router();
const pizzeriaController = require('../controllers/pizzeriaController');

router.get('/', pizzeriaController.getAll);

router.get('/add', pizzeriaController.getAddForm);
router.post('/add', pizzeriaController.postAdd);

router.post('/delete/:id', pizzeriaController.deletePizza);

router.get('/about', pizzeriaController.getAboutPage);

router.get('/edit/:id', pizzeriaController.getEditPage);
router.post('/edit/:id', pizzeriaController.postEdit);

router.get('/register', pizzeriaController.getRegisterPage);
router.post('/register', pizzeriaController.registerUser);
router.get('/login', pizzeriaController.getLoginPage);
router.post('/login', pizzeriaController.loginUser);
router.get('/logout', pizzeriaController.logOut);


module.exports = router;
