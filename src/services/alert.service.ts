import { Alert } from "../models/alert.model";
import { randomUUID } from "crypto";

// Temporary in-memory storage
const alerts: Alert[] = [];

export function createAlert(data: Omit<Alert, "id" | "createdAt">): Alert {
  const newAlert: Alert = {
    id: randomUUID(),
    createdAt: new Date(),
    ...data
  };

  alerts.push(newAlert);
  return newAlert;
}

export function getAllAlerts(): Alert[] {
  return alerts;
}

export function getAlertById(id: string): Alert | undefined {
  return alerts.find(alert => alert.id === id);
}
