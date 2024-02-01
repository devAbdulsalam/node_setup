import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './utils/connectDB.js';
import home from './routes/home.js';
import userRoutes from './routes/user.js';
/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
	helmet.crossOriginResourcePolicy({
		policy: 'cross-origin',
	})
);
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
connectDB();

// app.use(express.static('public'));

/* ROUTES */

app.use('/', home);

app.use('/api/v1/users', userRoutes);

// 404 page
app.use((req, res) => {
	res.send('404 page not found');
});

const PORT = process.env.PORT || 9000;
const message = `app is listing to port ${PORT}..`;
app.listen(PORT, () => {
	console.log(message);
});
