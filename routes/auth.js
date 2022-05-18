const express = require("express"); 
const authController = require('../controllers/auth'); 

const router = express.Router();

router.post('/user', authController.user);
router.post('/admin', authController.admin);

router.post('/user/update_1', authController.update_1); 
router.post('/user/update_2', authController.update_2); 

router.post('/user/update_1/addItem', authController.addItem_1); 
router.post('/user/update_2/addItem', authController.addItem_2); 

router.post('/user/view_1', authController.viewItem_1); 
router.post('/user/view_2', authController.viewItem_2); 

router.post('/user/view_1/removeItem', authController.removeItem_1);
router.post('/user/view_2/removeItem', authController.removeItem_2);

module.exports = router; 