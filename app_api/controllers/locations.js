const mongoose = require('mongoose')
const LocationModel = mongoose.model('Location')


const locationsCreate = (req, res) => {
    res
        .status(200)
        .json({"status": "success"});
};
const locationsReadOne = (req, res) => {
    LocationModel
        .findById(req.params.locationid)
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({"message": "Location not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err)
            }
            res
                .status(200)
                .json(location);
        });
};
const locationsUpdateOne = (req, res) => {
    res
        .status(200)
        .json({"status": "success"});
};
const locationsDeleteOne = (req, res) => {
    res
        .status(200)
        .json({"status": "success"});
};
const locationsListByDistance = (req, res) => {
    res
        .status(200)
        .json({"status": "success"});
};

module.exports = {
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne,
    locationsListByDistance
};