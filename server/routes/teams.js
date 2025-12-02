const expess = require('express');
const router = expess.Router();
const prisma = require('../prisma/client');



//Get all teams with their members
router.get('/', async (req, res) => {
    try {                                                                                                          
        const teams = await TeamsService.getAllTeams();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams', error });
    }
});

//Get team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await TeamsService.getTeamById(req.params.id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team', error });
    }
});
      
//GET members of a specific team by ID
router.get('/:id/members', async (req, res) => {
    try {
        const members = await TeamsService.getMembersByTeamId(req.params.id);
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team members', error });
    }
});
     
//POST create new team
router.post('/', async (req, res) => {
    const { name, description } = req.body;

    if(!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    try {
        const team = await TeamsService.createTeam({name, description});
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create team', error });
    }
}); 

//POST member to a team
router.post('/:id/members', async (req, res) => {
   const {userId, role} = req.body;
   try {
       const teamMember = await TeamsService.addMemberToTeam(req.params.id, userId, role);
       res.status(201).json(teamMember);
   } catch (error) {
       res.status(500).json({ error: 'Failed to add member to team', error });
   }
});     
        
module.exports = router;
