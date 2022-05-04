const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const scoreController = require('../controllers/score_ctr');



router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/change_username_form', authController.changeUserName);
router.post('/change_pass_form', authController.changePassword);


router.post('/reset_score', scoreController.reset_score);
router.post('/save_score', scoreController.save_score);

router.post('/leader_board', scoreController.score_board);








module.exports = router;