import express, { Express, Request, Response,NextFunction } from "express";
import * as dotenv from "dotenv";
import { connect } from './db';
import authenticateUser from './auth/auth'
import router1 from "./users/userRoute";
import {router} from "./urls/urlRoute";
import { logger } from "./logger";
// import viewRouter from './views/viewRouter'
import path from "path";
import cookieParser from "cookie-parser";
import userController from './users/userController'
import {validateLogin,validateUser} from "./users/userMiddleware"



dotenv.config({ path: __dirname + '/./../../.env' })

const app: Express = express();

const port = process.env.PORT!;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/public' ,express.static(path.join(__dirname,'public')));
app.use('/public' ,express.static(path.join(__dirname,'reset.html')));
app.set('views',path.join(__dirname,'./views'))
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, ''));


app.use('/user/v1',router1)
app.use('/url/v1', router)
// app.use('/', viewRouter)


app.get('/', async (req:any, res:any) => {
	res.send('Shortener URL API');
});



app.get('*', (req:any, res:any) => {
	res.status(404).json({
		data: null,
		massage: 'Route Not Found',
	});
});

app.use((err:any, req:Request, res:Response, next:NextFunction) => {
	res.status(500).json({
		data: null,
		error: err.stack,
	});
});


export default app
