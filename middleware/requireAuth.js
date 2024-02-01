import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
// import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

const protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			// console.log(token);

			//decodes token id
			const decoded = jwt.verify(token, process.env.SECRET);
			// console.log(token);

			req.user = await User.findById(decoded._id).select('-password');

			next();
		} catch (error) {
			res.status(401).json('Not authorized, token failed');
		}
	}

	if (!token) {
		res.status(401).json('Not authorized, no token');
	}
};
const admin = async (req, res, next) => {
	if (!req.user.role.includes('admin'))
		return res.status(403).send({
			ok: false,
			error: 'Access denied.',
		});

	next();
};
const superAdmin = async (req, res, next) => {
	if (!req.user.role.includes('superAdmin'))
		return res.status(403).send({
			ok: false,
			error: 'Access denied.',
		});

	next();
};

export { protect, admin, superAdmin };
