const mongoose = require('mongoose');
require('dotenv').config();

// Import your models
const Profile = require('./models/Profile');
const Item = require('./models/Item');
const Request = require('./models/Request');

beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Clean up database and close connection
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Database Tests for HelpingHands', () => {
    beforeEach(async () => {
        // Clean up before each test to avoid conflicts
        await mongoose.connection.db.dropDatabase();
    });

    /**
     * Profile Tests
     */
    describe('Profile Model Tests', () => {
        test('Should create a new user profile', async () => {
            const profileData = {
                email: 'testuser@example.com',
                firstName: 'John',
                lastName: 'Doe',
                gymName: 'Helping Gym',
                password: 'hashedpassword123',
                type: 'regular', // Required field added
            };

            const profile = new Profile(profileData);
            const savedProfile = await profile.save();

            expect(savedProfile._id).toBeDefined();
            expect(savedProfile.email).toBe(profileData.email);
        });

        test('Should retrieve a user profile by email', async () => {
            const profileData = {
                email: 'testuser@example.com',
                firstName: 'John',
                lastName: 'Doe',
                gymName: 'Helping Gym',
                password: 'hashedpassword123',
                type: 'regular',
            };

            await Profile.create(profileData);

            const profile = await Profile.findOne({ email: 'testuser@example.com' });
            expect(profile).not.toBeNull();
            expect(profile.email).toBe('testuser@example.com');
        });

        test('Should update a user profile', async () => {
            const profileData = {
                email: 'testuser@example.com',
                firstName: 'John',
                lastName: 'Doe',
                gymName: 'Helping Gym',
                password: 'hashedpassword123',
                type: 'regular',
            };

            await Profile.create(profileData);

            const updatedData = { firstName: 'UpdatedName' };
            const profile = await Profile.findOneAndUpdate(
                { email: 'testuser@example.com' },
                updatedData,
                { new: true }
            );
            expect(profile.firstName).toBe('UpdatedName');
        });

        test('Should delete a user profile', async () => {
            const profileData = {
                email: 'testuser@example.com',
                firstName: 'John',
                lastName: 'Doe',
                gymName: 'Helping Gym',
                password: 'hashedpassword123',
                type: 'regular',
            };

            await Profile.create(profileData);

            const result = await Profile.deleteOne({ email: 'testuser@example.com' });
            expect(result.deletedCount).toBe(1);
        });
    });

    /**
     * Item Tests
     */
    describe('Item Model Tests', () => {
        test('Should create a new item', async () => {
            const itemData = {
                title: 'Test Item',
                description: 'Test Description',
                type: 'general',
                userId: new mongoose.Types.ObjectId(),
                address: {
                    street: '123 Test St',
                    city: 'Test City',
                    province: 'Test Province',
                    country: 'Test Country',
                },
                images: ['image1.png'],
                status: 1,
            };

            const item = new Item(itemData);
            const savedItem = await item.save();

            expect(savedItem._id).toBeDefined();
            expect(savedItem.title).toBe(itemData.title);
        });

        test('Should retrieve an item by title', async () => {
            const itemData = {
                title: 'Test Item',
                description: 'Test Description',
                type: 'general',
                userId: new mongoose.Types.ObjectId(),
                address: {
                    street: '123 Test St',
                    city: 'Test City',
                    province: 'Test Province',
                    country: 'Test Country',
                },
                images: ['image1.png'],
                status: 1,
            };

            await Item.create(itemData);

            const item = await Item.findOne({ title: 'Test Item' });
            expect(item).not.toBeNull();
            expect(item.title).toBe('Test Item');
        });

        test('Should update an item status', async () => {
            const itemData = {
                title: 'Test Item',
                description: 'Test Description',
                type: 'general',
                userId: new mongoose.Types.ObjectId(),
                address: {
                    street: '123 Test St',
                    city: 'Test City',
                    province: 'Test Province',
                    country: 'Test Country',
                },
                images: ['image1.png'],
                status: 1,
            };

            await Item.create(itemData);

            const item = await Item.findOneAndUpdate(
                { title: 'Test Item' },
                { status: 0 },
                { new: true }
            );
            expect(item.status).toBe(0);
        });

        test('Should delete an item by title', async () => {
            const itemData = {
                title: 'Test Item',
                description: 'Test Description',
                type: 'general',
                userId: new mongoose.Types.ObjectId(),
                address: {
                    street: '123 Test St',
                    city: 'Test City',
                    province: 'Test Province',
                    country: 'Test Country',
                },
                images: ['image1.png'],
                status: 1,
            };

            await Item.create(itemData);

            const result = await Item.deleteOne({ title: 'Test Item' });
            expect(result.deletedCount).toBe(1);
        });
    });
});
