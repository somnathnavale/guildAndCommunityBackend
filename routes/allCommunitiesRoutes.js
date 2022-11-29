const express = require('express');
const { getAllCommunities } = require('../controllers/communityController');
const router = express.Router();

router.get('/', getAllCommunities, async (req, res) => {
    
});

module.exports = router;