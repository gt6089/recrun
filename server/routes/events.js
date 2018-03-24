// events routes
const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController');

router.post('/:id/players', eventController.addPlayerToEvent);
router.get('/:id/players', eventController.showPlayersAttendance);
router.get('/:id', eventController.showEvent)

router.post('/', eventController.createEvent)
router.get('/', eventController.getEvents)

module.exports = router
