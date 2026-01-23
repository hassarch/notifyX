import { Router } from "express";
import { createAlert, getAllAlerts } from "../services/alert.service";
import { validateCreateAlert } from "../utils/validator";

const router = Router();

/**
 * POST /alerts
 * Create a new alert
 */
router.post("/", (req, res) => {
  const error = validateCreateAlert(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const alert = createAlert(req.body);
  res.status(201).json(alert);
});

/**
 * GET /alerts
 * List all alerts (for debugging)
 */
router.get("/", (req, res) => {
  res.json(getAllAlerts());
});

export default router;
