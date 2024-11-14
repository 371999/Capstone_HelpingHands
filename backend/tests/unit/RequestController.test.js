const { getRequestsByUserId, createRequest, deleteRequestById, updateRequestStatus } = require('../../src/controllers/RequestController');
const httpMocks = require('node-mocks-http');
const Request = require('../../src/models/Request');

jest.mock('../../src/models/Request');

describe('RequestController', () => {
  describe('getRequestsByUserId', () => {
    it('returns requests for a valid user ID', async () => {
      const mockRequests = [{ requestType: 'donation', itemId: '123' }];
      Request.find.mockResolvedValue(mockRequests);
      const req = httpMocks.createRequest({ params: { userId: 'validUserId' } });
      const res = httpMocks.createResponse();
      await getRequestsByUserId(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockRequests);
    });

    it('returns empty array if user has no requests', async () => {
      Request.find.mockResolvedValue([]);
      const req = httpMocks.createRequest({ params: { userId: 'validUserId' } });
      const res = httpMocks.createResponse();
      await getRequestsByUserId(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual([]);
    });
  });

  describe('createRequest', () => {
    it('creates a new request and returns success', async () => {
      const newRequest = { requestType: 'donation', userId: 'validUserId', itemId: '123' };
      Request.prototype.save = jest.fn().mockResolvedValue(newRequest);
      const req = httpMocks.createRequest({ body: newRequest });
      const res = httpMocks.createResponse();
      await createRequest(req, res);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ message: 'Request created successfully' });
    });
  });

  describe('deleteRequestById', () => {
    it('deletes request and returns success message', async () => {
      Request.findByIdAndDelete.mockResolvedValue({ requestType: 'donation', userId: 'validUserId' });
      const req = httpMocks.createRequest({ params: { requestId: 'validRequestId' } });
      const res = httpMocks.createResponse();
      await deleteRequestById(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ message: 'Request deleted successfully' });
    });

    it('returns 404 if request to delete is not found', async () => {
      Request.findByIdAndDelete.mockResolvedValue(null);
      const req = httpMocks.createRequest({ params: { requestId: 'invalidRequestId' } });
      const res = httpMocks.createResponse();
      await deleteRequestById(req, res);
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ error: 'Request not found' });
    });
  });

  describe('updateRequestStatus', () => {
    it('updates the request status and returns success message', async () => {
      Request.findByIdAndUpdate.mockResolvedValue({ status: 'approved' });
      const req = httpMocks.createRequest({ params: { requestId: 'validRequestId' }, body: { status: 'approved' } });
      const res = httpMocks.createResponse();
      await updateRequestStatus(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ message: 'Request status updated successfully' });
    });

    it('returns 404 if request to update is not found', async () => {
      Request.findByIdAndUpdate.mockResolvedValue(null);
      const req = httpMocks.createRequest({ params: { requestId: 'invalidRequestId' }, body: { status: 'approved' } });
      const res = httpMocks.createResponse();
      await updateRequestStatus(req, res);
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ error: 'Request not found' });
    });
  });
});
