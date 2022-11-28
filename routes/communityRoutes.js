const express = require('express');
const { createCommunity, getCommunities, getCommunityById, updateCommunity, deleteCommunity} = require('../controllers/communityController');
const router = express.Router();

router.post('/:gid/community/', createCommunity, async (req, res) => {
    
});

router.get('/:gid/community/', getCommunities, async (req, res) => {
    
});

router.get('/:gid/community/:id/', getCommunityById, async (req, res) => {

});

router.put('/:gid/community/:id/', updateCommunity, async (req, res) => {
    
});

router.delete('/:gid/community/:id/', deleteCommunity, async (req, res) => {
    
});

module.exports = router;