const Activity = require('../models/activity.model');

exports.readController = (req, res) => {
    const activityId = req.params.id;
    User.findById(activityId).exec((err, activity) => {
        if (err || !activity) {
            return res.status(400).json({
                error: 'Activity not found'
            });
        }
        res.json(activity);
    });
};

exports.ListController = (req, res) => {
    Activity.find().exec((err, activity) => {
        if (err || !activity) {
            return res.status(400).json({
                error: 'Activity not found'
            });
        }
        res.json(activity);
    });
};

exports.AddController = (req, res) => {
    const { activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant } = req.body;
    const errors = validationResult(req);

    const activity = new Activity({
        activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant
    });
    // activity.save()
    // .then(() => res.json('Activity added!'))
    // .catch(err => res.status(400).json('Error: ' + err));
    activity.save((err, activity) => {
        if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
                errors: errorHandler(err)
            });
        } else {
            return res.json({
                success: true,
                message: 'Add activity success',
                activity
            });
        }
    });
};

exports.deleteController = (req, res) => {
    const activityId = req.params.id;
    Activity.findByIdAndDelete(activityId).exec((err, activity) => {
        if (err || !activity) {
            return res.status(400).json({
                error: 'The activity not found'
            });
        }
        res.json('The activity deleted!');
    });
};
