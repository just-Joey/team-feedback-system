const prisma = require('../prisma/client');

exports.getAllTags = async () => {
  return await prisma.tag.findMany({
    orderBy: { name: 'asc' },
  });
};

exports.createTag = async (name) => {
  return await prisma.tag.create({
    data: { name },
  });
};

exports.deleteTag = async (id) => {
  return await prisma.tag.delete({
    where: { id: parseInt(id) },
  });
};  

                   