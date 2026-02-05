import dotenv from "dotenv";
dotenv.config(); // MUST be first

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Alerting Service running on port ${PORT}`);
});
