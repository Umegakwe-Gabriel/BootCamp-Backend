"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../config/multer");
const authController_1 = require("../controller/authController");
const router = express_1.default.Router();
router.route("/sign-in").post(authController_1.signInUser);
router.route("/sign-up").post(multer_1.upload, authController_1.createUser);
router.route("/users").get(authController_1.viewUser);
router.route("/:userID/user-detail").get(authController_1.viewOneUser);
router.route("/:userID/update-user").patch(authController_1.updateOneUser);
router.route("/:userID/delete-user").delete(authController_1.deleteUser);
exports.default = router;
