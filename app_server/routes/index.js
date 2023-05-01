import express from 'express';
const router = express.Router();
import ctrlLocations from '../controllers/locations.js';
import ctrlOthers from '../controllers/others.js';

/* Locations */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Other */
router.get('/about', ctrlOthers.about);

export default router;
