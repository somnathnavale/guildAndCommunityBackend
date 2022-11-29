const Activity = require('../models/activitiesModel');

const createActivity = async (req, res, next) => {

    if(!req.body.title) return res.status(404).send({ msg: 'Name field is required!' });
    if(!req.body.description) return res.status(404).send({ msg: 'Description field is required!' });
    if(!req.body.pointers.length) return res.status(404).send({ msg: 'Pointers field is required!' });
    if(!req.body.presenter.length) return res.status(404).send({ msg: 'Presenter field is required!' });
    if(!req.body.date) return res.status(404).send({ msg: 'Date field is required!' });

    const activity = new Activity({
        title: req.body.title,
        description: req.body.description,
        pointers: req.body.pointers,
        presenter: req.body.presenter,
        date: req.body.date,
        cid: req.params.cid
    });

    try{

        const newActivity = await activity.save();
        res.status(201).json(newActivity);

    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

const getActivities = async (req, res, next) => { 
    
    try{

        const activities = await Activity.find({ cid: req.params.cid });
        res.status(200).json(activities);

    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

const getActivityById = async (req, res, next) => {
    try{

        const activity = await Activity.findById(req.params.id);

        if(!activity) return res.status(404).send({ msg: `Activity with id ${req.params.id} not found!` })

        res.status(200).json(activity);

    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });

    }

    next();
};

const updateActivity = async (req, res, next) => {

    try{

        const updatedActivity = await Activity.findByIdAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            description: req.body.description,
            pointers: req.body.pointers,
            presenter: req.body.presenter,
            date: req.body.date,
            cid: req.body.cid
        })

        res.status(201).json(updatedActivity);
        
    }catch(error){

        res.status(500).send({ msg: 'Oops! Something went wrong.' });
    
    }

    next();
};

const deleteActivity = async (req, res, next) => {
    
    try{

        const found = await Activity.findByIdAndDelete(req.params.id)

        if(!found) return res.status(404).send({ msg: `Activity with id: ${req.params.id} not found!` })

        res.send({ msg: `Activity with id: ${req.params.id} deleted successfully!` });

    }catch(error){
        res.status(500).send({ msg: 'Oops! Something went wrong.' });
    }

    next();
};

module.exports = {
    createActivity,
    getActivities,
    getActivityById,
    updateActivity,
    deleteActivity
};