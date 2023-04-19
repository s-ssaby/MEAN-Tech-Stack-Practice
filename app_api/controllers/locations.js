const mongoose = require('mongoose')
const LocationModel = mongoose.model('Location')


const locationsCreate = (req, res) => {};
const locationsReadOne = (req, res) => {};
const locationsUpdateOne = (req, res) => {};
const locationsDeleteOne = (req, res) => {};
const locationsListByDistance = (req, res) => {};

module.exports = {
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne,
    locationsListByDistance
};