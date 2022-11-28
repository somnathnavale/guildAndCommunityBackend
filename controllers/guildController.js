const Guild = require('../models/guildModel');

const createGuild = async (req, res, next) => {

    if(!req.body.name) return res.status(400).send({ msg: 'Name field is required!'});
    if(!req.body.polestar.length) return res.status(400).send({ msg: 'Polestar field is required!'});

    for(let i = 0; i < req.body.polestar.length; i++){
        if(!req.body.polestar[i].name) return res.status(400).send({ msg: `Polestar's Name is required!`});
        if(!req.body.polestar[i].designation) return res.status(400).send({ msg: `Polestar's designation field is required!`});
        if(!req.body.polestar[i].imageUrl) return res.status(400).send({ msg: `Polestar's image is required!`});
    }

    if(!req.body.torchBearer) return res.status(400).send({ msg: 'TorchBearer field is required!'});
    if(!req.body.trendSetter) return res.status(400).send({ msg: 'TrendSetter field is required!'});
    if(!req.body.purpose) return res.status(400).send({ msg: 'Purpose field is required!'});

    const guild = new Guild({
        name: req.body.name,
        polestar: req.body.polestar,
        torchBearer: req.body.torchBearer,
        trendSetter: req.body.trendSetter,
        purpose: req.body.purpose
    });

    try{

        const newGuild = await guild.save();
        res.status(201).json(newGuild);
    
    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

const getGuilds = async (req, res, next) => { 
    
    try{

        const guilds = await Guild.find();
        res.status(200).json(guilds);

    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

const getGuildById = async(req, res, next) => {

    try{
        const guild = await Guild.findById(req.params.id);

        if(!guild) return res.status(404).send({ msg: `Guild with id ${req.params.id} not found!`});

        res.status(200).json(guild);

    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

const updateGuild = async (req, res, next) => {

    try{

        const updatedGuild = await Guild.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            polestar: req.body.polestar,
            torchBearer: req.body.torchBearer,
            trendSetter: req.body.trendSetter,
            purpose: req.body.purpose
        });

        res.status(201).json(updatedGuild);

    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

const deleteGuild = async (req, res, next) => {
    
    try{

        const found = await Guild.findByIdAndDelete(req.params.id);

        if(!found) return res.status(404).send({ msg: `Guild with id ${req.params.id} not found!` });

        res.status(200).send({ msg: `Guild with id: ${req.params.id} deleted successfully!`});

    }catch(error){

        res.status(500).json(error);

    }

    next();
};

module.exports = {
    createGuild,
    getGuilds,
    getGuildById,
    updateGuild,
    deleteGuild
};