import { randomUUID } from "crypto";
import db from "../db/database";
import { Alert } from "../models/alert.model";

export function createAlert(data: Omit<Alert, "id" | "createdAt">): Alert {
  const alert: Alert = {
    id: randomUUID(),
    createdAt: new Date(),
    ...data
  };

  db.prepare(`
    INSERT INTO alerts (id, name, trigger, channels, message, recipients, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    alert.id,
    alert.name,
    alert.trigger,
    JSON.stringify(alert.channels),
    alert.message,
    JSON.stringify(alert.recipients),
    alert.createdAt.toISOString()
  );

  return alert;
}

export function getAlertById(id: string): Alert | null {
  const row = db
    .prepare(`SELECT * FROM alerts WHERE id = ?`)
    .get(id);

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    trigger: row.trigger,
    channels: JSON.parse(row.channels),
    message: row.message,
    recipients: JSON.parse(row.recipients),
    createdAt: new Date(row.createdAt)
  };
}

export function getAllAlerts(): Alert[] {
  const rows = db.prepare(`SELECT * FROM alerts`).all();

  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    trigger: row.trigger,
    channels: JSON.parse(row.channels),
    message: row.message,
    recipients: JSON.parse(row.recipients),
    createdAt: new Date(row.createdAt)
  }));
}
