import cors from "cors";
import express, { Application } from "express";
import { globalErrorHandler } from "./errors/globalErrorHandler";
import notFound from "./middleware/notFound";
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

// not found route
app.use(notFound);

// export app
export default app;
