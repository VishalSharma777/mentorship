const Router = require('express')
const router = Router();
const { newComment , getComments ,getCommentById } = require('../controllers/comment')
const {verifyJWT} = require('../middleware/verify')


router.post('/newComments/:sessionId',verifyJWT, newComment);
router.get('/getComments',verifyJWT, getComments);
router.get('/getCommentById/:sessionId',verifyJWT, getCommentById)




module.exports = router;