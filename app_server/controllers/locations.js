/* Homepage */
const homelist = (req, res) => {
    res.render('index', {title: 'Home'});
};

/* Location Info */
const locationInfo = (req, res) => {
    res.render('index', {title: 'Location info'});
};

/* Add Review */
const addReview = (req, res) => {
    res.render('index', {title: 'Add review'});
};

module.exports = {
    homelist,
    locationInfo,
    addReview
}