import express from "express";
import healthRouter from "./routes/health";
import alertsRouter from "./routes/alerts";
import triggerRouter from "./routes/trigger";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/alerts", alertsRouter);
app.use("/trigger", triggerRouter); // 👈 NEW

export default app;
