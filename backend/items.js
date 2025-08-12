\
    const express = require('express');
    const router = express.Router();

    // In-memory stores
    let items = [];
    let idCounter = 101; // start from 101 as your example uses 101

    /**
     * @swagger
     * components:
     *   schemas:
     *     Item:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *           example: 101
     *         title:
     *           type: string
     *           example: "Black Leather Wallet"
     *         description:
     *           type: string
     *           example: "Contains ID cards and cash"
     *         category:
     *           type: string
     *           example: "Wallet"
     *         status:
     *           type: string
     *           example: "Lost"
     *         date:
     *           type: string
     *           example: "2025-08-05"
     *         location:
     *           type: string
     *           example: "Mumbai Central Station"
     *         image_url:
     *           type: string
     *           example: "https://example.com/wallet.jpg"
     *         posted_by:
     *           type: integer
     *           example: 1
     *     ErrorResponse:
     *       type: object
     *       properties:
     *         error:
     *           type: string
     *           example: "Item not found"
     */

    /**
     * @swagger
     * /api/items:
     *   get:
     *     summary: Get a list of all lost and found items
     *     responses:
     *       200:
     *         description: Items fetched successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Item'
     *       404:
     *         description: No items found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    router.get('/', (req, res) => {
      if (items.length === 0) {
        return res.status(404).json({ error: "No items found" });
      }
      // return a compact list per contract (only selected fields)
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

    /**
     * @swagger
     * /api/items/{id}:
     *   get:
     *     summary: Get details of a specific item
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Item details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Item'
     *       404:
     *         description: Item not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    router.get('/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const item = items.find(it => it.id === id);
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.json(item);
    });

    /**
     * @swagger
     * /api/items:
     *   post:
     *     summary: Post a new lost or found item
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Item'
     *     responses:
     *       201:
     *         description: Item posted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Item posted successfully"
     *                 item_id:
     *                   type: integer
     *                   example: 101
     *       400:
     *         description: Invalid item data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    router.post('/', (req, res) => {
      const body = req.body || {};
      // Basic validation per contract: require title, category, status, date, location, posted_by
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

    /**
     * @swagger
     * /api/items/{id}:
     *   put:
     *     summary: Update the status of an item
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               status:
     *                 type: string
     *                 example: "Found"
     *     responses:
     *       200:
     *         description: Item status updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Item status updated successfully"
     *       404:
     *         description: Item not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    router.put('/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const itemIndex = items.findIndex(it => it.id === id);
      if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });
      const status = req.body && req.body.status;
      if (!status) return res.status(400).json({ error: "Invalid item data" });
      items[itemIndex].status = status;
      return res.json({ message: "Item status updated successfully" });
    });

    /**
     * @swagger
     * /api/items/{id}:
     *   delete:
     *     summary: Delete an item by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Item deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Item deleted successfully"
     *       404:
     *         description: Item not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    router.delete('/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const prevLen = items.length;
      items = items.filter(it => it.id !== id);
      if (items.length === prevLen) return res.status(404).json({ error: "Item not found" });
      return res.json({ message: "Item deleted successfully" });
    });

    module.exports = router;
