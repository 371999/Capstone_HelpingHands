const RequestController = require('backend/src/controllers/RequestController');
const Request = require('backend/src/models/Request');
const Constants = require('backend/src/utils/Constants');

jest.mock('backend/src/models/Request'); // Mocking Request model

describe('RequestController', () => {
    describe('getAllRequests', () => {
        it('should return all requests', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockRequests = [{ id: 'req1' }, { id: 'req2' }];

            Request.find.mockResolvedValue(mockRequests);

            await RequestController.getAllRequests(req, res);

            expect(res.status).toHaveBeenCalledWith(Constants.STATUSOK);
            expect(res.json).toHaveBeenCalledWith(mockRequests);
        });
    });

    describe('createRequest', () => {
        it('should create a new request', async () => {
            const req = { body: { requestType: 'type', comments: 'some comments', userId: 'user1', itemId: '507f1f77bcf86cd799439011', ownerId: 'owner1', userName: 'user', message: 'message' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockRequest = { _id: 'req3', message: 'Request created successfully' };

            Request.create.mockResolvedValue(mockRequest);

            await RequestController.createRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(Constants.STATUSCREATED);
            expect(res.json).toHaveBeenCalledWith(mockRequest);
        });

        it('should return 400 if required fields are missing', async () => {
            const req = { body: { comments: 'some comments' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await RequestController.createRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(Constants.STATUSNOTFOUND);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields.' });
        });
    });
});
