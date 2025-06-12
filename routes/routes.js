const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const BabiesController = require('../controllers/BabiesController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const Measurements = require('../controllers/MeasurementsController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', AuthMiddleware.protect, AuthController.getMe);
router.post('/logout', AuthMiddleware.protect, AuthController.logout); 

router.put('/update-profile', AuthMiddleware.protect, AuthController.updateProfile);
router.put('/update-password', AuthMiddleware.protect, AuthController.updatePassword);

router.get('/babies/:id', AuthMiddleware.protect, BabiesController.getById);
router.post('/babies', AuthMiddleware.protect, BabiesController.create);
router.put('/babies/:id', AuthMiddleware.protect, BabiesController.update);

router.get('/measurements', AuthMiddleware.protect, Measurements.getAll);
router.post('/measurements', AuthMiddleware.protect, Measurements.create);
router.get('/measurements/:id', AuthMiddleware.protect, Measurements.getById);
router.get('/measurements/baby/:baby_id', AuthMiddleware.protect, Measurements.getByBabyId);
router.put('/measurements/:id', AuthMiddleware.protect, Measurements.update);
router.delete('/measurements/:id', AuthMiddleware.protect, Measurements.delete);

module.exports = router;