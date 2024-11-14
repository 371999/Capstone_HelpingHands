const { createItem, getItemById } = require('../../src/controllers/ItemController');
const httpMocks = require('node-mocks-http');
const Item = require('../../src/models/Item');

jest.mock('../../src/models/Item');

describe('ItemController', () => {
  describe('createItem', () => {
    it('creates a new item', async () => {
      Item.prototype.save = jest.fn().mockResolvedValue({ _id: 'itemId123', title: 'New Item' });
      const req = httpMocks.createRequest({ body: { title: 'New Item', description: 'A test item' } });
      const res = httpMocks.createResponse();
      await createItem(req, res);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ message: 'Item created successfully', itemId: 'itemId123' });
    });
  });

  describe('getItemById', () => {
    it('returns item data if found', async () => {
      Item.findById.mockResolvedValue({ title: 'Existing Item' });
      const req = httpMocks.createRequest({ params: { id: 'existingId' } });
      const res = httpMocks.createResponse();
      await getItemById(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ title: 'Existing Item' });
    });
  });
});
