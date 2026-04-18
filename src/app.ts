import express from "express";
import cors from "cors";
import routes from "./routes/IncidentRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api", routes);

export default app;