const mongoose = require('mongoose');
const Request = require('../models/Request');
const Constants = require('../utils/Constants');
const Item = require('../models/Item');

exports.getRequestsByUserId = async (req, res) => {
    try {
        const { ownerId } = req.params;

        // Fetch requests by userId
        console.log("userId", ownerId);
        const requests = await Request.find({ ownerId });
        console.log("request", requests);


        // Collect all itemIds from the requests and convert them to ObjectId
        const itemIds = requests.map(request => new mongoose.Types.ObjectId(request.itemId));

        console.log("before");

        // Fetch items with matching _id
        const items = await Item.find({ _id: { $in: itemIds } });
        console.log("after");

        console.log("item endtets", items.find(item => item._id.toString() === requests[0].itemId));
        // Attach each item to the corresponding request
        const requestsWithItems = requests.map(request => {
            const item = items.find(item => item._id.toString() === request.itemId);
            return { ...request.toObject(), item };
        });
        console.log("end", requestsWithItems);


        res.status(200).json(requestsWithItems);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Server error.' });
    }
};
