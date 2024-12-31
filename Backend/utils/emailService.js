import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPassword
  }
});

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'Email Verification - WeCare',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a73e8;">Welcome to WeCare!</h2>
        <p>Your verification code is:</p>
        <div style="background-color: #f5f5f5; padding: 24px; border-radius: 4px; margin: 16px 0; text-align: center;">
          <h1 style="color: #1a73e8; font-size: 32px; margin: 0;">${otp}</h1>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't create an account with WeCare, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

export const sendLoginNotification = async (email, loginTime, deviceInfo) => {
  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'New Login Detected - WeCare',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a73e8;">New Login Alert</h2>
        <p>We detected a new login to your WeCare account.</p>
        <div style="background-color: #f5f5f5; padding: 16px; border-radius: 4px; margin: 16px 0;">
          <p><strong>Time:</strong> ${loginTime}</p>
          <p><strong>Device:</strong> ${deviceInfo.device}</p>
          <p><strong>Browser:</strong> ${deviceInfo.browser}</p>
          <p><strong>Location:</strong> ${deviceInfo.location || 'Unknown'}</p>
        </div>
        <p>If this wasn't you, please secure your account immediately by changing your password.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending login notification:', error);
    return false;
  }
}; 