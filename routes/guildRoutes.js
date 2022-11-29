const express = require('express');
const { createGuild, getGuilds, getGuildById, updateGuild, deleteGuild } = require('../controllers/guildController');
const { createCommunity, getCommunities, getCommunityById, updateCommunity, deleteCommunity} = require('../controllers/communityController');
const { createActivity, getActivities, getActivityById, updateActivity, deleteActivity } = require('../controllers/activitiesController');
const router = express.Router();

router.post('/', createGuild);

router.get('/', getGuilds);

router.get('/:id', getGuildById);

router.put('/:id', updateGuild);

router.delete('/:id', deleteGuild);

router.post('/:gid/community', createCommunity);

router.get('/:gid/community', getCommunities);

router.get('/:gid/community/:id', getCommunityById);

router.put('/:gid/community/:id', updateCommunity);

router.delete('/:gid/community/:id', deleteCommunity);

router.post('/:gid/community/:cid/activity', createActivity);

router.get('/:gid/community/:cid/activity', getActivities);

router.get('/:gid/community/:cid/activity/:id', getActivityById);

router.put('/:gid/community/:cid/activity/:id', updateActivity);

router.delete('/:gid/community/:cid/activity/:id', deleteActivity);

module.exports = router;