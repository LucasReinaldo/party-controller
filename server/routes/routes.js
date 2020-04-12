const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const GuestController = require('../controllers/GuestController');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middlewares/auth');

const routes = Router();

//AUTH
routes.post('/user/auth', AuthController.auth);
routes.post('/new/user', AuthController.store);
routes.post('/user/forgot-password', AuthController.forgotPassword);
routes.post('/user/reset-password', AuthController.resetPassword);

//USER
routes.get('/users', UserController.index);
routes.get('/my/user/', AuthMiddleware, UserController.indexById);
routes.delete('/delete/user/:id', UserController.destroy);

//GUEST
routes.get('/guests', AuthMiddleware, GuestController.index);
routes.post(
	'/invite/guest',
	AuthMiddleware,
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			fullName: Joi.string().required(),
			isConfirmed: Joi.boolean().sensitive(false),
			dietary: Joi.required(),
			phoneNumber: Joi.string().required().min(10).max(13),
			email: Joi.string().required().email(),
		}),
	}),
	GuestController.store
);
routes.put('/update/guest/:id', AuthMiddleware, GuestController.update);
routes.delete(
	'/delete/guest/:id',
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.required(),
		}),
	}),
	GuestController.destroy
);

module.exports = routes;
