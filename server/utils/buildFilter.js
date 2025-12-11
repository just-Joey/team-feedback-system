function buildFilter(query) {
 const where = {}; 

  if (query.fromUserId) where.fromUserId = parseInt(query.fromUserId);
  if (query.toUserId) where.toUserId = parseInt(query.toUserId);
  if (query.teamId) where.teamId = parseInt(query.teamId);
  if (query.feedbackCycleId) where.feedbackCycleId = parseInt(query.feedbackCycleId);

  return where;
}

module.exports = buildFilter;