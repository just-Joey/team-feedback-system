const expess = require('express');
const router = expess.Router();
const prisma = require('../prisma/client');

//GET all users
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({orderBy: {id:'asc'}});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

//Create a new user
router.post('/', async (req, res) => {
    const { name, email, role } = req.body;

    if(!name || !email || !role) {
        return  res.status(400).json({ error: 'Name, email and role are required' });
    }   
    try {
        const user = await prisma.user.create({
            data: { name, email, role },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

module.exports = router;