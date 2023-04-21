const mongoose = require('mongoose')
const LocationModel = mongoose.model('Location')


//POST
const locationsCreate = (req, res) => {
    LocationModel.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: {
            type: "Point",
            coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        }, 
        // subdocument array of opening times containing
        // days, opening/closing, closed status for each element
        openingTimes: req.body.openingTimes
    }, (err, location) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(location)
        }
    });
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

// extract necessary location display info like distance and address without reviews
// used with below function
const extract_location_info = (location) => {
    return {
        id: result._id,
        name: result.name,
        address: result.address,
        rating: result.rating,
        facilities: result.facilities,
        // returns integer meters
        distance: `${result.distance.calculated.toFixed()} m`
    }
};

//GET
const locationsListByDistance = async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const near = {
        type: "Point",
        coords: [lng, lat]
    };
    const geoOptions = {
        distanceField: "distance.calculated",
        // calculate distances using spherical geometry
        spherical: true,
        // limits how far locations can be
        maxDistance: 20000,
        // max results to return
        limit: 10
    };
    try {
        const results = await LocationModel.aggregate([
            {
                $geoNear: {
                    near,
                    ...geoOptions
                }
            }
        ]);
        // only return necessary info
        const locations = results.map(extract_location_info)
        return res
            .status(200)
            .json(locations)
    } catch (err) {
        res
            .status(404)
            .json(err)
    }
};

module.exports = {
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne,
    locationsListByDistance
};