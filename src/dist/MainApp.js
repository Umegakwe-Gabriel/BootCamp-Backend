"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./router/authRoute"));
const mainApp = (app) => {
    app.use((0, cors_1.default)())
        .use(express_1.default.json())
        .use("/api/v1/auth", authRoute_1.default);
};
exports.mainApp = mainApp;
