import test, { afterEach, describe } from 'node:test';
import app from '../api';
import * as db from './app.spec';
import supertest from 'supertest';
const request = supertest(app);
describe('Test request with mongoose', () => {
	beforeAll(async () => {
		await db.connect();
	});
	afterEach(async () => {
		await db.clearDatabase();
	});
	afterAll(async () => {
		await db.closeDatabase();
	});

	test('GET - /', async () => {
		const res = await request.get('/').send();
		const body = res.body;
		const message = body.message;
		expect(res.statusCode)
		expect(message)
		;
	});
});
function beforeAll(arg0: () => Promise<void>) {
	throw new Error('Function not implemented.');
}

function afterAll(arg0: () => Promise<void>) {
	throw new Error('Function not implemented.');
}

function expect(statusCode: number) {
	throw new Error('Function not implemented.');
}

function toBe(arg0: number) {
	throw new Error('Function not implemented.');
}

