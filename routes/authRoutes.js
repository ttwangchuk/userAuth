const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Root route 
router.get('/', (req, res) => {
    res.render('pages/landing');
});

//signup route
router.get('/signup', authController.getSignUp);
router.post('/signup', authController.postSignUp);

//email verification route
router.get('/verify-email', authController.verifyEmail);

//login route
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;

//forgot password route 
router.get('/forgot-password', authController.getForgotPassword);
router.post('/forgot-password', authController.postForgotPassword);

//reset password route
router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);
module.exports = router;


//logout route 
router.get('/logout',authController.logout);

module.exports = router;