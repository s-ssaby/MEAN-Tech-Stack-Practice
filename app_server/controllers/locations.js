import got from 'got';

//configuration that changes depending on whether run in production or not
const apiOptions = {
    server: 'http://localhost:3000'
}

if (process.env.NODE_ENV === 'production') {
    // use website's domain name
    apiOptions.server = process.env.DOMAIN;
}

const renderHomepage = (req, res, apiBody) => {
    console.log(apiBody)
    res.render('locations-list', {
        title: 'Locater - find a place to work with WiFi',
        pageHeader: {
            title: 'Locater',
            strapline: 'Find places to work with WiFi near you!'
        },
        sidebar: 'Locater helps you find places to work when out and about.',
        locations: apiBody
    });
};
/* Homepage */
const homelist = async(req, res) => {
    const path = '/api/locations';
    const requestOptions = {
        method: 'GET',
        searchParams: {
            lng: -.7992599,
            lat: 51.378091,
            maxDistance: 20
        }
    };
    const response = await got.get(`${apiOptions.server}${path}`,requestOptions).json()
    renderHomepage(req, res, response);
};

/* Location Info */
const locationInfo = (req, res) => {
    res.render('location-info', {
        title: 'Starcups',
        pageHeader: {title: 'Starcups'},
        sidebar: {
            context: ' is on Loc8r because it has accessible Wifi and a place to sit down and work',
            callToAction: 'Please leave a review if you have visited this location' 
        },
        location: {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Drinks', 'Food', '5G WiFi'],
            coords: {lat: 51.455041, lng: -0.9690884},
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00 AM',
                closing: '7:00 PM',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00 AM',
                closing: '5:00 PM',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'Great place!'
            }, {
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee was not great.'
            }]
        }
    });
};

/* Add Review */
const addReview = (req, res) => {
    res.render('location-review-form', {
        title: 'Review Starcups on Locater',
        pageHeader: {title: 'Review Starcups'}
    });
};

export default {
    homelist,
    locationInfo,
    addReview,
}; 
