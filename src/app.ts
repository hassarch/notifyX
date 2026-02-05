import express from "express";
import healthRouter from "./routes/health";
import alertsRouter from "./routes/alerts";
import triggerRouter from "./routes/trigger";
import { apiKeyAuth } from "./middleware/auth";
import {limiter} from "./middleware/rateLimit";

const app = express();
app.use(express.json());

app.use("/health", healthRouter); // public
app.use(limiter);

//  protected routes
app.use("/alerts", apiKeyAuth, alertsRouter);
app.use("/trigger", apiKeyAuth, triggerRouter);

app.use((err: any, req: any, res: any, next: any) => {
  console.error("❌ Error:", err);

  res.status(500).json({
    error: "Internal server error"
  });
});


export default app;
