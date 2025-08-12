let items = [];
let nextId = 101;

exports.getAllItems = (req, res) => {
  if (items.length === 0) return res.status(404).json({ error: "No items found" });
  const compactItems = items.map(({id, title, category, status, date, location}) => ({
    id, title, category, status, date, location
  }));
  res.json(compactItems);
};

exports.getItemById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};

exports.postItem = (req, res) => {
  const { title, description, category, status, date, location, image_url, posted_by } = req.body;
  if (!title || !category || !status || !date || !location || !posted_by) {
    return res.status(400).json({ error: "Invalid item data" });
  }
  const newItem = {
    id: nextId++,
    title,
    description: description || '',
    category,
    status,
    date,
    location,
    image_url: image_url || '',
    posted_by
  };
  items.push(newItem);
  res.status(201).json({ message: "Item posted successfully", item_id: newItem.id });
};

exports.updateStatus = (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "Invalid item data" });

  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.status = status;
  res.json({ message: "Item status updated successfully" });
};

exports.deleteItem = (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  items.splice(index, 1);
  res.json({ message: "Item deleted successfully" });
};