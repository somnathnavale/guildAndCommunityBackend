const express = require('express');
const { createActivity, getActivities, getActivityById, updateActivity, deleteActivity } = require('../controllers/activitiesController');
const router = express.Router();

router.post('/:gid/community/:cid/activity/', createActivity, async (req, res) => {
    
});

router.get('/:gid/community/:cid/activity/', getActivities, async (req, res) => {
    
});

router.get('/:gid/community/:cid/activity/:id', getActivityById, async (req, res) => {
    
});

router.put('/:gid/community/:cid/activity/:id/', updateActivity, async (req, res) => {
    
});

router.delete('/:gid/community/:cid/activity/:id/', deleteActivity, async (req, res) => {
    
});

module.exports = router;