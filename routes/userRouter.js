const userConttoller = require('../controllers/userController');
const userMiddelware = require('../middelwares/userMiddelware')
const express=require('express');
const router = express.Router();

router.post('/create',userConttoller.createNewUser);
router.patch('/update',userConttoller.updateUserProfile);
router.delete('/delete', userConttoller.deleteUser);
router.get('/get', userConttoller.getAllUsers);
router.post('/login',userMiddelware.loginAuth, userConttoller.loginUser);



module.exports=router;

