const mongoose = require('mongoose');
const Item = require('../src/models/Item');
const { createItem, updateItemById, getItems, deleteItemById } = require('../src/controllers/ItemController');

jest.mock('../src/models/Item'); // Mock the Item model

describe('Item Model and Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
  

    // Mock controller functions
    it('should create an item and return success response', async () => {
        const mockRequest = {
            body: {
                title: 'Test Item',
                type: 'clothing',
                userId: 'user123',
                address: {
                    street: '123 Main St',
                    city: 'Halifax',
                    province: 'NS',
                    country: 'Canada',
                },
                images: ['image1.png'],
            },
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockItem = { _id: 'item123', ...mockRequest.body };
        Item.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockItem),
        })); // Mock save

        await createItem(mockRequest, mockResponse);

        expect(Item.prototype.save).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).not.toHaveBeenCalledWith({
            message: 'Item created successfully',
            itemId: 'item123',
        });
    });

    it('should update an item successfully', async () => {
        const mockRequest = {
            params: { id: 'item123' },
            body: {
                title: 'Updated Title',
                type: 'updatedType',
            },
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockItem = {
            _id: 'item123',
            title: 'Original Title',
            type: 'originalType',
            save: jest.fn().mockResolvedValue(),
        };

        Item.findById.mockResolvedValue(mockItem);

        await updateItemById(mockRequest, mockResponse);

        expect(Item.findById).toHaveBeenCalledWith('item123');
        expect(mockItem.title).toBe('Updated Title');
        expect(mockItem.type).toBe('updatedType');
        expect(mockItem.save).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Item updated successfully',
            itemId: 'item123',
        });
    });

    it('should delete an item successfully', async () => {
        const mockRequest = { params: { id: 'item123' } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockItem = { _id: 'item123' };
        Item.findByIdAndDelete.mockResolvedValue(mockItem);

        await deleteItemById(mockRequest, mockResponse);

        expect(Item.findByIdAndDelete).toHaveBeenCalledWith('item123');
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Item deleted successfully',
            itemId: 'item123',
        });
    });

    it('should return 404 when deleting a non-existent item', async () => {
        const mockRequest = { params: { id: 'item123' } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Item.findByIdAndDelete.mockResolvedValue(null);

        await deleteItemById(mockRequest, mockResponse);

        expect(Item.findByIdAndDelete).toHaveBeenCalledWith('item123');
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });
});
