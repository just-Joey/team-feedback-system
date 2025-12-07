const prisma = require('../prisma/client');

exports.getAllUsers = async () => {
   return prisma.user.findMany({orderBy: {id:'asc'}});
}

exports.getUserById = async (id) => {
   return prisma.user.findUnique({ where: { id: parseInt(id) } });
}

exports.createUser = async (data) => {
 return await prisma.user.create(data);
}

exports.updateUser = async (id, data) => {
 return prisma.user.update({ 
    where: { id: parseInt(id) }, 
    data  
   });   
};

exports.deleteUser = async (id) => {
 return prisma.user.delete({ where: { id: parseInt(id) } });
}              


