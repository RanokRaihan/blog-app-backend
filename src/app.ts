import cors from "cors";
import express, { Application } from "express";
import { globalErrorHandler } from "./errors/globalErrorHandler";
import router from "./routes";
// Create Express server
const app: Application = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// all routes
app.use("/api", router);
//test route
app.get("/", (req, res) => {
  res.send("hurray! server is up and running!! Majje Karo!!");
});

//global error handler
app.use(globalErrorHandler);
export default app;
