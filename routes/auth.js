const express = require("express"); 
const router = express.Router();

// Server Side 
const loginController = require('../controllers/server-side/server-login'); 
const signoutController = require('../controllers/server-side/server-signout'); 
const server_addItemController = require('../controllers/server-side/server_addItem'); 
const server_viewPageController = require('../controllers/server-side/server_viewItem'); 
const server_addHomeController = require('../controllers/server-side/server_addHome'); 
const server_insertItemController = require('../controllers/server-side/server_insertItem'); 
const server_removeItemController = require('../controllers/server-side/server_removeItem'); 
const server_submitItemController = require('../controllers/server-side/server_submitItem'); 
const server_editItemController = require('../controllers/server-side/server_editItem'); 
const server_removeItemEditController = require('../controllers/server-side/server_removeItem_edit'); 
const server_viewDoneController = require('../controllers/server-side/server_viewDone'); 
const server_togoOrderController = require('../controllers/server-side/server_togoOrder'); 
const server_togoBoxController = require('../controllers/server-side/server_togoBox'); 
const server_phoneOrderController = require('../controllers/server-side/server_phoneOrder'); 
const server_viewBackController = require('../controllers/server-side/server_viewBack'); 
const server_phoneBoxController = require('../controllers/server-side/server_phoneBox'); 


router.post('/user', loginController.user); 
router.post('/user/signout', signoutController.signout_user); 
router.post('/user/addItem', server_addItemController.addItem); 
router.post('/user/viewPage', server_viewPageController.viewPage); 
router.post('/user/addHome', server_addHomeController.addHome); 
router.post('/user/insertItem', server_insertItemController.insertItem); 
router.post('/user/removeItem', server_removeItemController.removeItem); 
router.post('/user/submitItem', server_submitItemController.submitItem); 
router.post('/user/editItem', server_editItemController.editItem); 
router.post('/user/removeItem_edit', server_removeItemEditController.removeItem_edit); 
router.post('/user/viewDone', server_viewDoneController.viewDone);
router.post('/user/togoOrder', server_togoOrderController.togoOrder); 
router.post('/user/togoBox', server_togoBoxController.togoBox); 
router.post('/user/phoneOrder', server_phoneOrderController.phoneOrder); 
router.post('/user/viewBack', server_viewBackController.viewBack); 
router.post('/user/phoneBox', server_phoneBoxController.phoneBox); 


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