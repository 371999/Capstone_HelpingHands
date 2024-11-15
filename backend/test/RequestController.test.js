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

            expect(res.status).toHaveBeenCalledWith(Constants.STATUSOK); // Assuming Constants.STATUSOK is 200
            expect(res.json).toHaveBeenCalledWith(mockRequests);
        });
    });

    describe('createRequest', () => {
        it('should create a new request', async () => {
            const req = { body: { title: 'New Request', description: 'Request Description' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockCreatedRequest = { id: 'req3', message: 'Request created successfully' };

            Request.create.mockResolvedValue(mockCreatedRequest);

            await RequestController.createRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(Constants.STATUSCREATED); // Assuming Constants.STATUSCREATED is 201
            expect(res.json).toHaveBeenCalledWith(mockCreatedRequest);
        });
    });
});
