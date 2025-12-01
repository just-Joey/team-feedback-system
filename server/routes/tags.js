const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');     

//GET all tags
router.get('/', async (req, res) => {
    try {
        const tags = await prisma.feedbackTag.findMany()
        res.json(tags);         
    } catch (err) { 
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
});

//DELETE tag by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTag = await prisma.feedbackTag.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json(deletedTag);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete tag' });
    }
});

module.exports = router;    