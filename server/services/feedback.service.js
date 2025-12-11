const prisma = require('../prisma/client');
const buildFilter = require('../utils/buildFilter');

exports.getAllFeedback = async (filters) => {
  const where = buildFilter(filters);

  return await prisma.feedback.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      fromUser: true,
      toUser: true,
      team: true,
      feedbackCycle: true,
      tags: true,
    },
  });
}   

exports.getFeedbackById = async (id) => {
  return awaitprisma.feedback.findUnique({
    where: { id: parseInt(id) },
    include: {
      fromUser: true,
      toUser: true,
      team: true,
      feedbackCycle: true,
      tags: true,
    },
  });
}

exports.createFeedback = async (data) => {
  return await prisma.feedback.create({
    data: (data),
    include: {
      fromUser: true,
      toUser: true,
      team: true,
      feedbackCycle: true,
      tags: true,
    },
  });
}
