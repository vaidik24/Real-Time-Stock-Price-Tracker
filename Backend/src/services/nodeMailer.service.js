import nodemailer from "nodemailer";
/**
 * Sends an email using Nodemailer
 * @param {string} userEmail - The recipient's email address
 * @param {string} subject - Email subject
 * @param {string} content - Email content/body
 * @returns {Promise<object>} - Success or error message
 */
export const sendEmail = async (userEmail, subject, content) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Email credentials are missing!");
    throw new Error("Email credentials must be set in environment variables");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject,
    text: content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${userEmail}: ${info.messageId}`);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    throw new Error("Failed to send email notification");
  }
};
