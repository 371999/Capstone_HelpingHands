const express = require("express");
const { createRequest, getRequestsByUserId } = require("../controllers/RequestController");
const router = express.Router();

router.get('/:ownerId', getRequestsByUserId);
router.get('/:itemId/:userId', getRequestByItemAndUser);

module.exports = router;
