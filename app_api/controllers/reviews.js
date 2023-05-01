import mongoose from 'mongoose'
const LocationModel = mongoose.model('Location')



function setAverageRating (location) {
    /**
     * Assumes that location document exists
     * @param location Location document
     */
    if (location.reviews && location.reviews.length > 0) {
        const count = location.reviews.length;
        const total = location.reviews.reduce((acc, {rating}) => {
            return acc + rating;
        }, 0)
        location.rating = parseInt(total/count, 10);
        location.save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Average rating updated to ${location.rating}`);
            }
        });
    }
};

function updateAverageRating (locationID) {
    LocationModel.findById(locationID)
        .select('rating reviews')
        .exec((err, location) => {
            if (!err) {
                setAverageRating(location);
            }
        });
};

function addReview  (req, res, location)  {
    /**
     * Adds a review to a location
     * Assumes that location document exists
     * @param location Location document
     */
    const {author, rating, reviewText} = req.body;
    location.reviews.push({
        author,
        rating,
        reviewText
    });
    location.save((err, location) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            updateAverageRating(location._id);
            const thisReview = location.reviews.slice(-1).pop();
            res
                .status(201)
                .json(thisReview);
        }
    });
};

const reviewsCreate = (req, res) => {
    const locationID  = req.params.locationid
    if (locationID) {
        LocationModel
            .findById(locationID)
            .select('reviews')
            .exec((err, location) => {
                if (err) {
                    res
                        .status(400)
                        .json(err)
                } else {
                    // Add Review
                    addReview(req, res, location);
                }
            });
    } else {
        res
            .status(404)
            .json({"message": "Location not found"});
    }
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
    if (!req.params.locationid || !req.params.reviewid) {
        return res
            .status(404)
            .json({"message": "Not found, locationid and reviewid required"});
    }
    LocationModel
        .findById(req.params.locationid)
        .select('reviews')
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
            if (location.reviews && location.reviews.length > 0) {
                const thisReview = location.reviews.id(req.params.reviewid);
                if (!thisReview) {
                    res
                        .status(404)
                        .json({"message": "Review not found"});
                } else {
                    thisReview.author = req.body.author;
                    thisReview.rating = req.body.rating;
                    thisReview.reviewText = req.body.reviewText;
                    location.save((err, location) => {
                        if (err) {
                            res
                                .status(404)
                                .json(err);
                        } else {
                            updateAverageRating(location._id);
                            res
                                .status(200)
                                .json(thisReview)
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({"message":"No review to update"});
            }
        });
};

const reviewsDeleteOne = (req, res) => {
    const {locationid, reviewid} = req.params;
    if (!locationid || !reviewid) {
        return res
            .status(404)
            .json({"message": "Not found, locationid and reviewid required"});
    }
    LocationModel
        .findById(locationid)
        .select('reviews')
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
            if (location.reviews && location.reviews.length > 0) {
                if (!location.reviews.id(reviewid)) {
                    return res
                        .status(404)
                        .json({"message":"Review not found"});
                } else {
                    location.reviews.id(reviewid).remove();
                    location.save(err => {
                        if (err) {
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            updateAverageRating(location._id);
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({"message":"No review to delete"})
            }
        });
};

export default {
    reviewsCreate,
    reviewsDeleteOne,
    reviewsReadOne,
    reviewsUpdateOne
};