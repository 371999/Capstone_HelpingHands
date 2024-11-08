const express = require("express");
const { createItem, getItemById, deleteItemById, updateItemById, getItems, getOwnerItems } = require("../controllers/ItemController");
const router = express.Router();

//Routes for user profile record
router.get('/:id', getItemById);
router.get('/owner/:userId', getOwnerItems);
router.get('/', getItems);
router.post("/", createItem);
router.put('/:id', updateItemById);
router.delete('/:id', deleteItemById);
// router.delete('/:id',authenticate,userAuthorization, deleteUserProfileById);

module.exports = router;
