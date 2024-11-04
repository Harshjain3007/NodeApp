const express = require('express')
const router = express.Router()

const {registeruser,getuserbyId,getuserdetails,updateuserdetails,deleteuser} = require('../controllers/user.js')





router.post('/registeruser',registeruser)
router.get('/getuserbyId/:userid',getuserbyId)
router.get('/AllUserDetails',getuserdetails)

router.put('/UpdateUserDetails/:id',updateuserdetails)


router.patch('/deleteuser/:id',deleteuser)





module.exports = router
