import { randomUUID } from "crypto";
import db from "../db/database";
import { Alert } from "../models/alert.model";

/**
 * Create and store a new alert in the database
 */
export function createAlert(
  data: Omit<Alert, "id" | "createdAt">
): Alert {
  const alert: Alert = {
    id: randomUUID(),
    createdAt: new Date(),
    ...data
  };

  db.prepare(`
    INSERT INTO alerts (
      id,
      name,
      trigger,
      channels,
      message,
      recipients,
      schedule,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    alert.id,
    alert.name,
    alert.trigger,
    JSON.stringify(alert.channels),
    alert.message,
    JSON.stringify(alert.recipients),
    alert.schedule || null,
    alert.createdAt.toISOString()
  );

  return alert;
}

/**
 * Get a single alert by ID
 */
export function getAlertById(id: string): Alert | null {
  const row: any = db
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
    schedule: row.schedule || undefined,
    createdAt: new Date(row.createdAt)
  };
}

/**
 * Get all alerts
 */
export function getAllAlerts(): Alert[] {
  const rows: any[] = db
    .prepare(`SELECT * FROM alerts`)
    .all();

  return rows.map(row => ({
    id: row.id,
    name: row.name,
    trigger: row.trigger,
    channels: JSON.parse(row.channels),
    message: row.message,
    recipients: JSON.parse(row.recipients),
    schedule: row.schedule || undefined,
    createdAt: new Date(row.createdAt)
  }));
}
