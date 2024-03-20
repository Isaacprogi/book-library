const express = require('express');
const userControllers = require('../controllers/user.js');
const { protect } = require('../middleware/protect.js');
const  {requireAdmin} = require('../middleware/requireAdmin.js')

const router = express.Router();

router.use(protect);

router.get('/', taskController.getTasks);
router.post('/', taskController.addTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id', taskController.updateTask);

module.exports = router;