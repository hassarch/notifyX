import cron from "node-cron";
import { getAllAlerts } from "../services/alert.service";
import { renderTemplate } from "../utils/template";
import { sendEmail } from "../services/email.service";

export function startScheduler() {
  const alerts = getAllAlerts();

  alerts
    .filter(alert => alert.trigger === "scheduled" && alert.schedule)
    .forEach(alert => {
      cron.schedule(alert.schedule!, async () => {
        const message = renderTemplate(alert.message, {});

        if (alert.channels.includes("email") && alert.recipients.email) {
          await sendEmail(
            alert.recipients.email,
            ` ${alert.name}`,
            message
          );
        }

        console.log(`⏰ Scheduled alert sent: ${alert.name}`);
      });
    });
}
