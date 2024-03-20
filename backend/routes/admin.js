const router = require('express').Router()
router.use(cookieParser())

//register route
router.route('/admin').get(register)










module.exports = router
