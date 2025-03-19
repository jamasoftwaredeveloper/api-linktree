// const express = require("express"); //CJS CommonJS module system
import express from "express"; //ESM EcmaScript module system
import cors from "cors";
import 'dotenv/config'
import router from "./routes/auth";
import {connectDB} from "./config/db"
import { corsConfig } from "./config/cors";

const app = express();
//Cors
app.use(cors(corsConfig))

//Leer datos de json
app.use(express.json())
//Conexión a base datos
connectDB();
// routes
app.use("/", router);

export default app;
