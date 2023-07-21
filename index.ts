import express, {Application} from "express"
import dotenv from "dotenv"
import { db } from "./config/db";
import { mainApp } from "./MainApp";
dotenv.config();


const readPort = process.env.MY_PORT;
const app: Application = express();

mainApp(app);
const port: number = parseInt(readPort!);

const server = app.listen(process.env.PORT || port, ()=>{
db();
})

process.on("uncaughtException", (error: Error)=>{
    console.log("Shutting down server due to uncaughtException");
    console.log(error)

    process.exit(1);
})

process.on("unhandledRejection", (reason: any)=>{
    console.log("Shutting down server due to unhandledRejection");
    console.log(reason)

    server.close(()=>{
        process.exit(1)
    })
})