const ItemController = require('backend/src/controllers/ItemController');
const Item = require('backend/src/models/Item');
const Constants = require('backend/src/utils/Constants');

jest.mock('backend/src/models/Item'); // Mocking Item model

describe('ItemController', () => {
    describe('getItemById', () => {
        it('should return item details if item exists', async () => {
            const req = { params: { id: 'item123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockItem = { id: 'item123', name: 'Sample Item' };

            Item.findById.mockResolvedValue(mockItem);

            await ItemController.getItemById(req, res);

            expect(res.status).toHaveBeenCalledWith(Constants.STATUSOK); // Assuming Constants.STATUSOK is 200
            expect(res.json).toHaveBeenCalledWith(mockItem);
        });

        it('should return 404 if item does not exist', async () => {
            const req = { params: { id: 'nonexistent' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            Item.findById.mockResolvedValue(null);

            await ItemController.getItemById(req, res);

            expect(res.status).toHaveBeenCalledWith(Constants.STATUSNOTFOUND); // Assuming Constants.STATUSNOTFOUND is 404
            expect(res.send).toHaveBeenCalledWith({ error: Constants.ITEMNOTFOUND });
        });
    });
});
