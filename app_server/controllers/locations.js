/* Homepage */
const homelist = (req, res) => {
    res.render('locations-list', {title: 'Home'});
};

/* Location Info */
const locationInfo = (req, res) => {
    res.render('location-info', {title: 'Location info'});
};

/* Add Review */
const addReview = (req, res) => {
    res.render('location-review-form', {title: 'Add review'});
};

module.exports = {
    homelist,
    locationInfo,
    addReview
}