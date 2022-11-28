const express = require('express');
const { createGuild, getGuilds, getGuildById, updateGuild, deleteGuild } = require('../controllers/guildController');
const router = express.Router();

router.post('/', createGuild, async (req, res) => {
    
});

router.get('/', getGuilds, async (req, res) => {
    
});

router.get('/:id/', getGuildById, async(req, res) => {

});

router.put('/:id/', updateGuild, async (req, res) => {
    
});

router.delete('/:id/', deleteGuild, async (req, res) => {
    
});

module.exports = router;