import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { startScheduler } from "./cron/scheduler";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Alerting Service running on port ${PORT}`);
  startScheduler(); // 👈 START CRON
});
