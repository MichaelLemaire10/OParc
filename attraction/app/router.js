const  {Router} = require('express');

const {getTicketId} = require("./middlewares/initMiddleware");

const initController = require("./controllers/initController");

const attractionController = require('./controllers/attractionController');

const visitorController = require('./controllers/visitorController');

const router = Router();

router.get('/init/:id(\\d+)', getTicketId(), initController.init);

router.get('/events', attractionController.findOpen);

router.get('/bookings', visitorController.findBooking);

//router.put('/book', );

module.exports = router;