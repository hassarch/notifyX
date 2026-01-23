export function validateCreateAlert(body: any): string | null {
  const { name, trigger, channels, message, recipients } = body;

  if (!name || typeof name !== "string") {
    return "Alert name is required";
  }

  if (!["webhook", "scheduled"].includes(trigger)) {
    return "Invalid trigger type";
  }

  if (!Array.isArray(channels) || channels.length === 0) {
    return "At least one channel is required";
  }

  if (!message || typeof message !== "string") {
    return "Message is required";
  }

  if (!recipients || typeof recipients !== "object") {
    return "Recipients are required";
  }

  return null;
}
