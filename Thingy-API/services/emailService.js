const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
  });

// Function to send alert email
const sendAlertEmail = async (alert) => {
  const mailOptions = {
    from: 'chimaprosper51@gmail.com',  
    to: 'chimaprosperukoma@gmail.com',    
    subject: 'Anomaly Detected!',
    text: alert
    // text: `Anomaly detected on ${alert.device_name} at ${alert.time_of_anomaly}. Metric: ${alert.metric_data}, Value: ${alert.anomaly_value}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendAlertEmail };
