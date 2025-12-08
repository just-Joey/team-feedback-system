const express = require('express');
const router = express.Router();
const UserService = require('../services/users.service');

//GET all users and order in ascending order by ID
router.get('/', async (req, res) => {
    try {  
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('USERS ROUTE ERROR:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

//GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.id);
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
  const { name, email, role } = req.body;
  try {
    const newUser = await UserService.createUser({ name, email, role });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('POST /users error:', err);
    res.status(500).json({
      error: 'Failed to create user',
      prismaCode: err.code,
      message: err.message,
      meta: err.meta,
    });
  }
});

//PUT update user by ID
router.put('/:id', async (req, res) => {
    const {name, email, role} = req.body;
    try {
        const updatedUser = await UserService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}); 

//Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await UserService.deleteUser(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});     

module.exports = router;