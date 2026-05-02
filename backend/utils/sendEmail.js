const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Your-Post Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your-Post | OTP Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          
          <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; text-align: center;">
            
            <h2 style="color: #333;">Welcome to Your-Post 🚀</h2>
            
            <p style="font-size: 16px; color: #555;">
              Use the OTP below to complete your verification
            </p>

            <div style="margin: 20px 0; font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #000;">
              ${otp}
            </div>

            <p style="color: #888;">
              This OTP is valid for <b>5 minutes</b>.
            </p>

            <hr style="margin: 20px 0;" />

            <p style="font-size: 12px; color: #aaa;">
              If you didn’t request this, you can safely ignore this email.
            </p>

            <p style="font-size: 12px; color: #aaa;">
              © ${new Date().getFullYear()} Your-Post. All rights reserved.
            </p>

          </div>
        </div>
      `,
    });

    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = { sendOTP };
