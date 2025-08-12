const express = require('express');
const router = express.Router();

let items = [];
let idCounter = 101;

// GET all items
router.get('/', (req, res) => {
  if (items.length === 0) {
    return res.status(404).json({ error: "No items found" });
  }
  const compact = items.map(i => ({
    id: i.id,
    title: i.title,
    category: i.category,
    status: i.status,
    date: i.date,
    location: i.location
  }));
  res.json(compact);
});

// GET item by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(it => it.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// POST new item
router.post('/', (req, res) => {
  const body = req.body || {};
  const required = ['title','category','status','date','location','posted_by'];
  for (let field of required) {
    if (!body[field]) {
      return res.status(400).json({ error: "Invalid item data" });
    }
  }
  const newItem = {
    id: idCounter++,
    title: body.title,
    description: body.description || '',
    category: body.category,
    status: body.status,
    date: body.date,
    location: body.location,
    image_url: body.image_url || '',
    posted_by: body.posted_by
  };
  items.push(newItem);
  res.status(201).json({ message: "Item posted successfully", item_id: newItem.id });
});

// PUT update item status
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(it => it.id === id);
  if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });
  const status = req.body && req.body.status;
  if (!status) return res.status(400).json({ error: "Invalid item data" });
  items[itemIndex].status = status;
  return res.json({ message: "Item status updated successfully" });
});

// DELETE item
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const prevLen = items.length;
  items = items.filter(it => it.id !== id);
  if (items.length === prevLen) return res.status(404).json({ error: "Item not found" });
  return res.json({ message: "Item deleted successfully" });
});

module.exports = router;
