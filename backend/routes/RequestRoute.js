const express = require("express");
const { createRequest, getRequestsByUserId } = require("../controllers/RequestController");
const router = express.Router();

router.get('/:ownerId', getRequestsByUserId);
router.get('/:itemId/:userId', getRequestByItemAndUser);
router.post("/", createRequest);

module.exports = router;
