import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS, not SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection at startup (VERY HELPFUL)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

export async function sendEmail(
  to: string[],
  subject: string,
  message: string
) {
  await transporter.sendMail({
    from: `"Alerting Service" <${process.env.EMAIL_USER}>`,
    to: to.join(","),
    subject,
    text: message
  });
}
