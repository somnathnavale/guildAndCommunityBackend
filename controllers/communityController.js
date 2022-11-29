const Community = require('../models/communityModel');
const Activity = require('../models/activitiesModel');

const createCommunity = async (req, res, next) => {

    if(!req.body.name) return res.status(404).send({ msg: 'Name field is required!' });
    if(!req.body.description) return res.status(404).send({ msg: 'Description field is required!' });
    if(!req.body.fileLink) return res.status(404).send({ msg: 'FileLink field is required!' });
    
    const community = new Community({
        name: req.body.name,
        gid: req.params.gid,
        description: req.body.description,
        membersCount: req.body.membersCount,
        fileLink: req.body.fileLink
    });

    try{

        const newCommunity = await community.save();
        res.status(201).json(newCommunity);

    }catch(error){

        res.status(400).json(error);

    }

    next();
};

const getCommunities = async (req, res, next) => {
    
    try{

        const communities = await Community.find({ gid: req.params.gid });
        res.status(200).json(communities);

    }catch(error){
        res.status(500).send({ msg: 'Oops! Something went wrong.' });
    }

    next();
};

const getCommunityById = async(req, res, next) => {

    try{

        const community = await Community.findById(req.params.id);

        if(!community) return res.status(404).send({ msg: `Community with id ${req.params.id} not found!` });

        res.status(200).json(community);

    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

const updateCommunity = async (req, res, next) => {

    try{
        const updatedCommunity = await Community.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            description: req.body.description,
            membersCount: req.body.membersCount,
            fileLink: req.body.fileLink
        })

        res.status(201).json(updatedCommunity);
        
    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

const deleteCommunity = async (req, res, next) => {
    
    try{

        await Activity.deleteMany({ cid: req.params.id });

        const found = await Community.findByIdAndDelete(req.params.id)

        if(!found) return res.status(404).send({ msg: `Community with id ${req.params.id} not found!` })

        res.send({ msg: `Community with id: ${req.params.id} deleted successfully!`});

    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

module.exports = {
    createCommunity,
    getCommunities,
    getCommunityById,
    updateCommunity,
    deleteCommunity
};