/**
 * Replaces {{key}} in a template with values from data object
 * Example:
 * template: "Order {{orderId}} failed"
 * data: { orderId: "ORD-1" }
 */
export function renderTemplate(
  template: string,
  data: Record<string, any>
): string {
  let result = template;

  for (const key in data) {
    const value = String(data[key]);
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    result = result.replace(regex, value);
  }

  return result;
}
