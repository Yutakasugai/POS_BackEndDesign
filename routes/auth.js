const express = require("express"); 
const router = express.Router();

// Server Side 
const loginController = require('../controllers/server-side/server-login'); 
const signoutController = require('../controllers/server-side/server-signout'); 
const server_addItemController = require('../controllers/server-side/server_addItem'); 
const server_viewPageController = require('../controllers/server-side/server_view'); 
const server_addHomeController = require('../controllers/server-side/server_addHome'); 
//const server_addBtnController = require('../controllers/server-side/server_addBtn'); 
//const server_addHomeController = require('../controllers/server-side/server_addHome');
//const server_addSubmitController = require('../controllers/server-side/server_addSubmit'); 

router.post('/user', loginController.user);
router.post('/user/signout', signoutController.signout_user); 
router.post('/user/addItem', server_addItemController.addItem); 
router.post('/user/viewPage', server_viewPageController.viewPage); 
router.post('/user/addHome', server_addHomeController.addHome); 
//router.post('/user/addBtn', server_addBtnController.addBtn); 
//router.post('/user/addHome', server_addHomeController.addHome); 
//router.post('/user/addSubmit', server_addSubmitController.addSubmit); 


// Admin Side
const admin_loginController = require("../controllers/kitchen-side/admin-login");
const admin_addUserController = require('../controllers/kitchen-side/admin_addUser'); 
const admin_createUserController = require('../controllers/kitchen-side/admin_createUser'); 
const admin_startBtnController = require('../controllers/kitchen-side/admin_startBtn'); 
const admin_homeBtnController = require('../controllers/kitchen-side/admin_homeBtn'); 
const admin_closeBtnController = require('../controllers/kitchen-side/admin_closeBtn'); 
const admin_viewDataController = require('../controllers/kitchen-side/admin_viewData'); 
const admin_doneBtnController = require('../controllers/kitchen-side/admin_doneBtn'); 
const admin_displayDataController = require('../controllers/kitchen-side/admin_displayData'); 

router.post('/admin', admin_loginController.admin); 
router.post('/admin/addUser', admin_addUserController.addUser); 
router.post('/admin/createUser', admin_createUserController.createUser); 
router.post('/admin/start', admin_startBtnController.startBtn); 
router.post('/admin/home', admin_homeBtnController.homeBtn); 
router.post('/admin/finish', admin_closeBtnController.closeBtn); 
router.post('/admin/viewData', admin_viewDataController.viewData); 
router.post('/admin/doneBtn', admin_doneBtnController.doneBtn); 
router.post('/admin/displayData', admin_displayDataController.displayData); 

// Test Page Temporary 
const testPage_addbtn = require("../controllers/test-page/tesPage"); 
const testPage_refresh = require("../controllers/test-page/tesPage"); 
const testPage_switch = require('../controllers/test-page/tesPage'); 

router.post('/addTest', testPage_addbtn.addTest); 
router.post('/refreshBtn', testPage_refresh.clearTest); 
router.post('/switchTest', testPage_switch.switchTest); 

module.exports = router; 