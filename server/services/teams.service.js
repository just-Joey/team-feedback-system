const prisma = require('../prisma/client');

exports.getAllTeams = async () => {
   return await prisma.team.findMany ({
       include: {
           members: {
               include: {
                   user: true
               }             
           }
       }
   });
}

exports.getTeamById = async (id) => {
   return await prisma.team.findUnique({
       where: { id: parseInt(id) },
       include: {
           members: {
               include: {
                   user: true
               }             
           }
       }
   });
}

exports.getMembersByTeamId = async (teamIdMember) => {
   return await prisma.teamMember.findMany({
       where: { teamId: parseInt(teamIdMember) },
       include: { user: true }
   });
}

exports.createTeam = async (data) => {
   return await prisma.team.create({
       data: ({data}),
   });
}

exports.addMemberToTeam = async (teamId, userId, role) => {
   return await prisma.teamMember.create({
       data: {
           teamId: parseInt(teamId),
           userId,
           role
       }
   });
}       








