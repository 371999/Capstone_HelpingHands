const Item = require('../models/Item');
const Request = require('../models/Request');
const Constants = require('../utils/Constants');

exports.createItem = async (request, response) => {
    const { title, description, type, userId, address, images, status = 1 } = request.body; // Default status to 1 if not provided

    try {
        // Create a new item based on the schema
        const newItem = new Item({
            title,
            userId,
            description,
            type,
            address: {
                street: address?.street || '',
                city: address?.city || '',
                province: address?.province || '',
                country: address?.country || ''
            },
            images,
            status
        });

        await newItem.save();

        response.status(Constants.STATUSCREATED).json({ message: 'Item created successfully', itemId: newItem._id });
    } catch (error) {
        console.log(error.message);
        response.status(Constants.INTERNALERRORSTATUS).send('Server error');
    }
};

exports.updateItemById = async (request, response) => {
    const { title, description, type, address, images, status } = request.body;
    const itemId = request.params.id; // itemId is expected to be the MongoDB _id

    try {
        // Find item by _id and ensure it exists
        const item = await Item.findById(itemId);
        if (!item) {
            return response.status(Constants.NOTFOUND).json({ message: 'Item not found' });
        }

        // Update fields if they are provided, else keep existing values
        item.title = title || item.title;
        item.description = description || item.description;
        item.type = type || item.type;
        item.images = images || item.images;
        item.status = status !== undefined ? status : item.status;  // Only update if status is provided

        if (address) {
            item.address.street = address.street || item.address.street;
            item.address.city = address.city || item.address.city;
            item.address.province = address.province || item.address.province;
            item.address.country = address.country || item.address.country;
        }

        await item.save();

        response.json({ message: 'Item updated successfully', itemId });
    } catch (error) {
        console.log(error.message);
        response.status(Constants.INTERNALERRORSTATUS).send('Server error');
    }
};


exports.deleteItemById = async (request, response) => {
    const itemId = request.params.id; // itemId is expected to be the MongoDB _id

    try {
        // Find and delete the item by _id
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            return response.status(Constants.NOTFOUND).json({ message: 'Item not found' });
        }

        response.json({ message: 'Item deleted successfully', itemId });
    } catch (error) {
        console.log(error.message);
        response.status(Constants.INTERNALERRORSTATUS).send('Server error');
    }
};

exports.getItemById = async (request, response) => {
    const itemId = request.params.id; // itemId is expected to be the MongoDB _id

    try {
        // Find the item by _id and ensure it exists
        const item = await Item.findById(itemId);
        if (!item) {
            return response.status(Constants.NOTFOUND).json({ message: 'Item not found' });
        }

        // Check if the item is active (status = 1)
        // if (item.status !== 1) {
        //     return response.status(Constants.FORBIDDEN).json({ message: 'Item is not active' });
        // }

        response.json({ item });
    } catch (error) {
        console.log(error.message);
        response.status(Constants.INTERNALERRORSTATUS).send('Server error');
    }
};


exports.getItems = async (request, response) => {
    const { status, type, userId } = request.query;

    try {
        // Base filter for the items
        const itemFilter = {};
        if (status) itemFilter.status = status;
        if (type) itemFilter.type = type;

        // If userId is provided, find items linked to requests with that userId
        let items;
        if (userId) {
            // Get request records with the specified userId
            const requests = await Request.find({ userId }).select('itemId');
            const itemIds = requests.map(req => req.itemId);

            // Add itemId filter based on matched requests
            itemFilter._id = { $in: itemIds };
        }

        // Fetch items with the constructed filter
        items = await Item.find(itemFilter).sort({ createdAt: -1 });

        response.json({ items });
    } catch (error) {
        console.log(error.message);
        response.status(Constants.INTERNALERRORSTATUS).send('Server error');
    }
};

exports.getOwnerItems = async (request, response) => {
    const userId = request.params.userId;
    console.log("userId", userId);

    try {
        const filter = { }; // Ensure only active items are retrieved
        // if (status) {
        //     filter.status = status; // Add status filter if provided
        // }
        
        // if (type) {
        //     filter.type = type; // Add type filter if provided
        // }
        if(userId) {
            filter.userId = userId;
        } else {
            return response.status(Constants.FORBIDDEN).json({ message: 'User Id is not present' });
        }
        console.log("filter", filter);
        const items = await Item.find(filter).sort({ createdAt: -1 });
        console.log("items", items);
        response.json({ items });
    } catch (error) {
        console.log(error.message);
        response.status(Constants.INTERNALERRORSTATUS).send('Server error');
    }
};

exports.getItemsByUpdatedDate = async (request, response) => {
    try {
        console.log("this is the method");
        // Fetch items sorted by updatedAt in ascending order
        const items = await Item.find().sort({ updatedAt: 1 });
        console.log("items", items);
        response.json({ items });
    } catch (error) {
        console.log(error.message);
        response.status(Constants.INTERNALERRORSTATUS).send('Server error');
    }
};
