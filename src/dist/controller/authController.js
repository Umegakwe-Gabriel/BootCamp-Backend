"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.viewOneUser = exports.viewUser = exports.updateOneUser = exports.signInUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const authModel_1 = __importDefault(require("../model/authModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const { public_id, secure_url } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const user = yield authModel_1.default.create({
            email: req.body.email, password: hash, userName: req.body.userName, avatar: secure_url, avatarID: public_id,
        });
        console.log(user);
        return res.status(201).json({ message: "user created", data: user });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.createUser = createUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (checkPassword) {
                return res.status(404).json({ message: "User created", data: user._id });
            }
            else {
                return res.status(404).json({ message: "Users password is incorrect" });
            }
        }
        else {
            return res.status(404).json({ message: "Users doesn't exit", });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "Unable to create user" });
    }
});
exports.signInUser = signInUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName } = req.body;
        const { userID } = req.params;
        const user = yield authModel_1.default.findByIdAndUpdate(userID, {
            userName,
        }, { new: true });
        return res.status(201).json({ message: "update user", data: user });
    }
    catch (error) {
        return res.status(404).json({ message: "Unable to update user" });
    }
});
exports.updateOneUser = updateOneUser;
const viewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(200).json({ message: "view users" });
    }
    catch (error) {
        return res.status(404).json({ message: "Unable to view user" });
    }
});
exports.viewUser = viewUser;
const viewOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        return res.status(200).json({ message: "view user", data: user });
    }
    catch (error) {
        return res.status(404).json({ message: "Unable to view User" });
    }
});
exports.viewOneUser = viewOneUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params;
        const user = yield authModel_1.default.findByIdAndDelete(userID);
        return res.status(201).json({ message: "user deleted", data: user });
    }
    catch (error) {
        return res.status(404).json({ message: "Unamble to delete user" });
    }
});
exports.deleteUser = deleteUser;
