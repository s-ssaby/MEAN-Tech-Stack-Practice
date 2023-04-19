const mongoose = require('mongoose')
const LocationModel = mongoose.model('Location')

const reviewsCreate = (req, res) => {
    res
        .status(200)
        .json({"status": "success"});
};
const reviewsReadOne = (req, res) => {
    LocationModel
        .findById(req.params.locationid)
        .select('name reviews')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({"message": "Location not found"});
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            // if location has reviews
            if (location.reviews && location.reviews.length > 0) {
                const review = location.reviews.id(req.params.reviewid);
                if (!review) {
                    return res
                        .status(400)
                        .json( {"message": "Review not found"});
                } else {
                    response = {
                        location: {
                            name: location.name,
                            id: req.params.locationid
                        },
                        review
                    };
                    return res
                        .status(200)
                        .json(response);
                }
            } else {
                return res
                    .status(404)
                    .json({"message": "No reviews found"});
            }
        });
};
const reviewsUpdateOne = (req, res) => {
    res
        .status(200)
        .json({"status": "success"});
};
const reviewsDeleteOne = (req, res) => {
    res
        .status(200)
        .json({"status": "success"});
};

module.exports = {
    reviewsCreate,
    reviewsDeleteOne,
    reviewsReadOne,
    reviewsUpdateOne
};