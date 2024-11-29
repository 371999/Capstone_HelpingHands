const express = require("express");
const {
  updateUserProfileById,
  getUserProfileById,
  deleteUserProfileById,
  getAllUsersByFirstName,
  getUsersByUpdatedDate,
} = require("../controllers/ProfileController");
const router = express.Router();
const { authenticate } = require("../middlewares/Authenticate");
const { userAuthorization } = require("../middlewares/Authorization");

//Routes for user profile record
router.get("/:id", getUserProfileById);
router.get("/get-all", getAllUsersByFirstName);
router.put("/:id", userAuthorization, updateUserProfileById);
router.delete("/:id", deleteUserProfileById);
router.get("/getAll/:id", getUsersByUpdatedDate);

module.exports = router;
