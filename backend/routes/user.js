const express = require('express');
const userControllers = require('../controllers/user.js');

const router = express.Router();

router.get('/', userControllers.getUsers);
router.get('/', userControllers.getUser);
router.post('/', userControllers.addUser);
router.delete('/:id', userControllers.deleteUser);
router.put('/:id', userControllers.updateUser);

module.exports = router;