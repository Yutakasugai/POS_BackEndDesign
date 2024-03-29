const express = require("express"); 
const router = express.Router();

// Server Side 
const loginController = require('../controllers/server-side/server_login'); 
const signoutController = require('../controllers/server-side/server_signout'); 
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
const server_updateBtnController = require('../controllers/server-side/server_updateBtn'); 
const server_finishBtnController = require('../controllers/server-side/server_finishBtn'); 
const server_closeBackController = require('../controllers/server-side/server_closeBack'); 
const server_closeTotalController = require('../controllers/server-side/server_closeTotal'); 
const server_closeAllController = require('../controllers/server-side/server_closeAll'); 


router.post('/user', loginController.user); 
router.post('/user/signout', signoutController.signOut); 
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
router.post('/user/updateTable', server_updateBtnController.updateTable); 
router.post('/user/finishBtn', server_finishBtnController.finishBtn); 
router.post('/user/closeBack', server_closeBackController.closeBack); 
router.post('/user/closeTotal', server_closeTotalController.closeTotal); 
router.post('/user/closeAll', server_closeAllController.closeAll); 


// Admin Side
const admin_loginController = require("../controllers/kitchen-side/admin_login"); 
const admin_signOutBtnController = require('../controllers/kitchen-side/admin_signOut'); 
const admin_doneBtnController = require('../controllers/kitchen-side/admin_doneBtn'); 
const admin_continueBtnController = require('../controllers/kitchen-side/admin_continueBtn'); 

router.post('/admin', admin_loginController.admin); 
router.post('/admin/signOut', admin_signOutBtnController.signOut); 
router.post('/admin/doneBtn', admin_doneBtnController.doneBtn); 
router.post('/admin/continueBtn', admin_continueBtnController.continueBtn); 

module.exports = router; 