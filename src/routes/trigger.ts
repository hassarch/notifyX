import { Router } from "express";
import { getAlertById } from "../services/alert.service";
import { renderTemplate } from "../utils/template";
import { sendEmail } from "../services/email.service";

const router = Router();

router.post("/:alertId", async (req, res) => {
  const { alertId } = req.params;
  const payload = req.body;

  const alert = getAlertById(alertId);
  if (!alert) {
    return res.status(404).json({ error: "Alert not found" });
  }

  const renderedMessage = renderTemplate(alert.message, payload);

  // 🔔 EMAIL CHANNEL
  if (
    alert.channels.includes("email") &&
    alert.recipients.email?.length
  ) {
    await sendEmail(
      alert.recipients.email,
      `🚨 ${alert.name}`,
      renderedMessage
    );
  }

  res.json({
    status: "executed",
    alertId: alert.id,
    renderedMessage,
    channelsExecuted: alert.channels
  });
});

export default router;
