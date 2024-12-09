const express = require("express");
const { createRequest, getRequestsByUserId, deleteRequestById, getRequestByItemAndUser, updateRequestStatus } = require("../controllers/RequestController");
const router = express.Router();

router.get('/:ownerId', getRequestsByUserId);
router.get('/:itemId/:userId', getRequestByItemAndUser);
router.post("/", createRequest);
router.delete('/:id', deleteRequestById);
router.patch('/:id/status', updateRequestStatus);

module.exports = router;
