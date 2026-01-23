import express from "express";
import healthRouter from "./routes/health";
import alertsRouter from "./routes/alerts";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/alerts", alertsRouter); // 👈 NEW

export default app;
