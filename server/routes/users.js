const expess = require('express');
const router = expess.Router();
const prisma = require('../prisma/client');

//GET all users and order in ascending order by ID
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({orderBy: {id:'asc'}});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
//GET user by ID
router.get('/:id', async (req, res) => {
    try {
        
        const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
        if(!user){
            return  res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}); 

//POST create new user
router.post('/', async (req, res) => {
    const {name, email, role} = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                role
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

//PUT update user by ID
router.put('/:id', async (req, res) => {
    const {name, email, role} = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: { email, name, role } });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}); 

//Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});     

module.exports = router;