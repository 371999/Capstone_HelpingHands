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
exports.createRequest = async (req, res) => {
    try {
        const { requestType, comments, userId, itemId, ownerId, userName, message } = req.body;

        console.log("userName is:", userName);
        // Validate required fields
        if (!requestType || !userId || !itemId || !ownerId || !userName || !message) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        // Cast itemId to ObjectId for querying
        const objectId = new mongoose.Types.ObjectId(itemId);

        // Check if item exists
        const item = await Item.findById(objectId);
        console.log("item", item);
        if (!item) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        // Set requestDate to current date
        const requestDate = new Date();

        const newRequest = new Request({
            requestType,
            requestDate, // Automatically set to current date
            comments,
            userId,
            itemId, // Keep as string in the schema
            ownerId,
            userName,
            message
        });
        console.log("before");

        const savedRequest = await newRequest.save();
        console.log("after");

        res.status(201).json(savedRequest);
    } catch (error) {
        console.log("error", error);
        res.status(Constants.INTERNALERRORSTATUS).json({ error: 'Server error.' });
    }
};
exports.deleteRequestById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the request by id and delete it
        const deletedRequest = await Request.findByIdAndDelete(id);

        // Check if the request was found and deleted
        if (!deletedRequest) {
            return res.status(404).json({ error: 'Request not found.' });
        }

        res.status(404).json({ message: 'Request deleted successfully.' });
    } catch (error) {
        res.status(Constants.INTERNALERRORSTATUS).json({ error: 'Server error.' });
    }
};
