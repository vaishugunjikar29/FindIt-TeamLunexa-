const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/itemsController');

// GET /api/items - get all items
router.get('/', itemsController.getAllItems);

// GET /api/items/:id - get item by id
router.get('/:id', itemsController.getItemById);

// POST /api/items - create new item
router.post('/', itemsController.postItem);

// PUT /api/items/:id - update item status
router.put('/:id', itemsController.updateStatus);

// DELETE /api/items/:id - delete item
router.delete('/:id', itemsController.deleteItem);

module.exports = router;