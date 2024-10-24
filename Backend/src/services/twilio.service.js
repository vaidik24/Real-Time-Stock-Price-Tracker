import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  console.error("Twilio credentials are missing!");
  throw new Error("Twilio credentials must be set in environment variables");
}

const client = twilio(accountSid, authToken);

/**
 * Sends an SMS using Twilio API
 * @param {string} body - Message to send via SMS
 * @param {string} phoneNumber - The recipient's phone number
 * @returns {Promise<object>} - Message object from Twilio API
 */

export const sendSMS = async (body, phoneNumber) => {
  const messageOptions = {
    body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  };

  if (!process.env.TWILIO_PHONE_NUMBER) {
    console.error("Twilio phone number is missing!");
    throw new Error("Twilio phone number must be set in environment variables");
  }

  try {
    const message = await client.messages.create(messageOptions);
    console.log(`SMS sent successfully: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`Failed to send SMS: ${error.message}`);
    throw new Error("Failed to send SMS notification");
  }
};
