const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const FeedbackService = require('../services/feedback.service');

 //Dynamic filter function for queries
function buildFilter(query) {
  const where = {};

  if (query.fromUserId) where.fromUserId = parseInt(query.fromUserId);
  if (query.toUserId) where.toUserId = parseInt(query.toUserId);
  if (query.teamId) where.teamId = parseInt(query.teamId);
  if (query.feedbackCycleId) where.feedbackCycleId = parseInt(query.feedbackCycleId);

  return where;
}


//GET All feedback with filers
router.get('/', async (req, res) => {
  try {
    const where = buildFilter(req.query);

    const feedback = await FeedbackService.getAllFeedback(where);

    res.json(feedback);
  } catch (err) {
    console.error('GET /feedback error:', err);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// GET feedback by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const entry = await FeedbackService.getFeedbackById(id);

    if (!entry) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json(entry);
  } catch (err) {
    console.error('GET /feedback/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});


  // Create feedback
router.post('/', async (req, res) => {
  const { fromUserId, toUserId, teamId, feedbackCycleId, body, rating, tags } =
    req.body;

  // validation
  if (!fromUserId || !toUserId || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (rating != null && (rating < 1 || rating > 5)) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const created = await FeedbackService.createFeedback({
      fromUserId,
      toUserId,
      teamId,
      feedbackCycleId,
      body,
      rating,
      tags,                 
    });

    res.status(201).json(created);
  } catch (err) {
    console.error('POST /feedback error:', err);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
});

module.exports = router;

