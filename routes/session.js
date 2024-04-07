const Router = require('express')
const router = Router();
const { verifyJWT} = require('../middleware/verify');
const { upload } = require('../middleware/ImageUpload');
const { createSession, getAllSession, getSessionBySessionId, getSessionByMentorId, updateSession } = require('../controllers/session');

router.post('/createSession', verifyJWT , upload.single('image')  , createSession)
router.get('/getAllSession', verifyJWT , getAllSession)
router.get('/getSessionById/:sessionId', verifyJWT , getSessionBySessionId)
router.get('/getSessionByMentorId/:mentorId', verifyJWT , getSessionByMentorId)
router.put('/updateSession/:sessionId', verifyJWT , updateSession)


module.exports = router;