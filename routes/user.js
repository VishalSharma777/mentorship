const Router = require('express')
const router = Router();
const { register, login, editUser, getAllUserProfile, getLoggedInUserProfile, getUserProfileById } = require('../controllers/user');
const { verifyJWT} = require('../middleware/verify');
const { upload } = require('../middleware/ImageUpload');

router.post('/register', register)
router.post('/login', login)
router.get('/userProfile', verifyJWT , getAllUserProfile)
router.get('/getUserById/:userId', verifyJWT , getUserProfileById)

router.get('/loggedInUserProfile', verifyJWT , getLoggedInUserProfile)


router.put('/editUser' , verifyJWT , upload.single('image'), editUser)
// router.route('/Profile').post(protect,updateUserProfile)

module.exports = router;