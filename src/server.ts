
import app from "./api";
import * as dotenv from 'dotenv'
import { connect } from './db';
import { logger } from "./logger";



dotenv.config({ path: __dirname + '/./../../.env' })
const port = process.env.PORT!;

connect(process.env.DB_URL!)
app.listen(port, () => {
	logger.info('[Server]=> Started');
});
