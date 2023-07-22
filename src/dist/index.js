"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const MainApp_1 = require("./MainApp");
dotenv_1.default.config();
const readPort = process.env.MY_PORT;
const app = (0, express_1.default)();
const port = parseInt(readPort);
(0, MainApp_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
    console.log("server");
    (0, db_1.db)();
});
process.on("uncaughtException", (error) => {
    console.log("Shutting down server due to uncaughtException");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("Shutting down server due to unhandledRejection");
    console.log(reason);
    server.close(() => {
        process.exit(1);
    });
});
