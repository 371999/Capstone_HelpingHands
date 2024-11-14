const { updateUserProfileById, getUserProfileById, deleteUserProfileById } = require('../../src/controllers/ProfileController');
const httpMocks = require('node-mocks-http');
const Profile = require('../../src/models/Profile');

jest.mock('../../src/models/Profile');

describe('ProfileController', () => {
  describe('getUserProfileById', () => {
    it('returns user profile if found', async () => {
      Profile.findById.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });
      const req = httpMocks.createRequest({ params: { userId: 'validUserId' } });
      const res = httpMocks.createResponse();
      await getUserProfileById(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ name: 'John Doe', email: 'john@example.com' });
    });

    it('returns 404 if user profile not found', async () => {
      Profile.findById.mockResolvedValue(null);
      const req = httpMocks.createRequest({ params: { userId: 'invalidUserId' } });
      const res = httpMocks.createResponse();
      await getUserProfileById(req, res);
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ error: 'User not found' });
    });
  });

  describe('updateUserProfileById', () => {
    it('updates and returns user profile if found', async () => {
      Profile.findByIdAndUpdate.mockResolvedValue({ name: 'Updated Name', email: 'updated@example.com' });
      const req = httpMocks.createRequest({ params: { userId: 'validUserId' }, body: { name: 'Updated Name' } });
      const res = httpMocks.createResponse();
      await updateUserProfileById(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ name: 'Updated Name', email: 'updated@example.com' });
    });

    it('returns 404 if profile to update is not found', async () => {
      Profile.findByIdAndUpdate.mockResolvedValue(null);
      const req = httpMocks.createRequest({ params: { userId: 'invalidUserId' }, body: { name: 'New Name' } });
      const res = httpMocks.createResponse();
      await updateUserProfileById(req, res);
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ error: 'User not found' });
    });
  });

  describe('deleteUserProfileById', () => {
    it('deletes the profile and returns success message', async () => {
      Profile.findByIdAndDelete.mockResolvedValue({ name: 'John Doe' });
      const req = httpMocks.createRequest({ params: { userId: 'validUserId' } });
      const res = httpMocks.createResponse();
      await deleteUserProfileById(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ message: 'User profile deleted successfully' });
    });

    it('returns 404 if profile to delete is not found', async () => {
      Profile.findByIdAndDelete.mockResolvedValue(null);
      const req = httpMocks.createRequest({ params: { userId: 'invalidUserId' } });
      const res = httpMocks.createResponse();
      await deleteUserProfileById(req, res);
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ error: 'User not found' });
    });
  });
});
