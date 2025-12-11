const prisma = require('../prisma/client');

exports.getAllTeams = async () => {
   return prisma.team.findMany ({
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
   return prisma.team.findUnique({
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
   return teamMember.findMany({
       where: { teamId: parseInt(teamIdMember) },
       include: { user: true }
   });
}

exports.createTeam = async (data) => {
return prisma.team.create({data})
}

exports.addMemberToTeam = async (teamId, userId, role) => {
   return await prisma.teamMember.create({
       data: {
           teamId: parseInt(teamId),
           userId: parseInt(userId),
           role
       }
   });
}       








