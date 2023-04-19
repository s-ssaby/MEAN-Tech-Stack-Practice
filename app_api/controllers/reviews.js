const mongoose = require('mongoose')
const LocationModel = mongoose.model('Location')

const reviewsCreate = (req, res) => {
    res
        .status(200)
        .json({"status": "success"});
};
const reviewsReadOne = (req, res) => {
    res
        .status(200)
        .json({"status": "success"});
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