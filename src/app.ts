import cors from "cors";
import express, { Application } from "express";
// Create Express server
const app: Application = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//test route
app.get("/", (req, res) => {
  res.send("hurray! server is up and running!! Majje Karo!!");
});
export default app;
