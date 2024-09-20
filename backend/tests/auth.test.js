const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = require('../app');
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');

process.env.JWT_KEY = 'test_jwt_secret';

describe('AuthController Tests', () => {
    let mongoServer;

    // Setup an in-memory MongoDB instance
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Clear the database between tests
    afterEach(async () => {
        await User.deleteMany({});
    });

    // Close the connection after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Test the Checkapi route
    test('GET /auth should return "Auth API is working"', async () => {
        const res = await request(app).get('/auth');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Auth API is working');
    });

    // Test the Signup route
    test('POST /auth/signup should create a new user', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword123',
            firstName: 'John',
            lastName: 'Doe',
        };

        const res = await request(app)
            .post('/auth/signup')
            .send(userData);

        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('Signup was successful');
    });

    // Test for email uniqueness during signup
    test('POST /auth/signup should return 400 for duplicate email', async () => {
        const user = new User({
            username: 'user1',
            email: 'user1@example.com',
            password: bcrypt.hashSync('password123', 10),
        });
        await user.save();

        const duplicateUser = {
            username: 'user2',
            email: 'user1@example.com', // Same email
            password: 'password123',
        };

        const res = await request(app)
            .post('/auth/signup')
            .send(duplicateUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('This email has already been registered');
    });

    // Test the Login route
    test('POST /auth/login should log in an existing user', async () => {
        const user = new User({
            username: 'user1',
            email: 'user1@example.com',
            password: bcrypt.hashSync('password123', 10),
        });
        await user.save();

        const loginData = {
            email: 'user1@example.com',
            password: 'password123',
        };

        const res = await request(app)
            .post('/auth/login')
            .send(loginData);

        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('Successfully logged in');
        expect(res.body.token).toBeDefined();
        expect(res.body.role).toBe(user.role);
    });

    // Test login failure with incorrect password
    test('POST /auth/login should fail with incorrect password', async () => {
        const user = new User({
            username: 'user1',
            email: 'user1@example.com',
            password: bcrypt.hashSync('password123', 10),
        });
        await user.save();

        const wrongPasswordData = {
            email: 'user1@example.com',
            password: 'wrongpassword',
        };

        const res = await request(app)
            .post('/auth/login')
            .send(wrongPasswordData);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('Incorrect email or password');
    });

    // Test login failure when user does not exist
    test('POST /auth/login should return 404 when user not found', async () => {
        const loginData = {
            email: 'nonexistent@example.com',
            password: 'password123',
        };

        const res = await request(app)
            .post('/auth/login')
            .send(loginData);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('User not found. Please signup first.');
    });
});
