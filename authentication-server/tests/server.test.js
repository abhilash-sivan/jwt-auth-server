const mongoose = require('mongoose')
const createServer = require('./../server');
const supertest = require('supertest')
const User = require('./../model/user')

beforeAll((done) => {
	mongoose.connect(
		'mongodb://localhost:27017/test',
		{ useNewUrlParser: true },
		() => done()
	)
})

afterAll((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
})

const app = createServer();

test('POST /login => invalid user should not be logged in', async () => {
	const data = {
		email: 'abhi@test.com',
		password: 'test1234'
	};

	await supertest(app)
		.post('/user/login')
		.send(data)
    .expect(404)
    .then(async (response) => {
      expect(response.body.message).toBeTruthy();
      expect(response.body.message).toBe('User not found / Invalid credentials');;
    });
});

test('POST /register should be success with valid data', async () => {
	const data = {
		firstName: 'abhilash',
		lastName: 'sivan',
		email: 'abhi@test.com',
		password: 'test1234'
	};

	await supertest(app)
		.post('/user/register')
		.send(data)
    .expect(201)
    .then(async (response) => {
      // Check the response
      expect(response.body.message).toBeTruthy();
      expect(response.body.message).toBe('Registration succesful');

      // Check the data in the database
      const user = await User.findOne({ email: data.email });
      expect(user).toBeTruthy();
      expect(user.email).toBe(data.email);
    });
});

process.env.ACCESS_TOKEN_SECRET='testkey1';
process.env.REFRESH_TOKEN_SECRET='testkey2';

test('POST /login => user should be logged in', async () => {
	const data = {
		email: 'abhi@test.com',
		password: 'test1234'
	};

	await supertest(app)
		.post('/user/login')
		.send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body.message).toBeTruthy();
      expect(response.body.message).toBe('Logged in succesfully');
			expect(response.body.AccessToken).toBeTruthy();
			expect(response.body.RefreshToken).toBeTruthy();
    });
});



