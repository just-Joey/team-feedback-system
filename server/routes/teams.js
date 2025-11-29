const expess = require('express');
const router = expess.Router();
const prisma = require('../prisma/client');

router.get('/teams', async (req, res) => {
    
    try {                                                                                                          
        const teams = await prisma.team.findMany ({include: {
            members: {
                include: {
                    user: true
                }             
            }
        }})
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams', error });
    }
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;
    if(!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const team = await prisma.team.create({
            data: { name, description },
        });
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create team', error });
    }
}); 
        
module.exports = router;
