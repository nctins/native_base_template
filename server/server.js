import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import APIRouter from "./src/routers/api.router.js";

require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 8080;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/api/v1/", APIRouter);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "vocano",
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

server.listen(PORT, () => {
  console.log(
    "Server is running on port: " + PORT + " \nHappy hacking :>"
  );
});
