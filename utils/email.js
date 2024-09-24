const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
  console.log("SMTP Mail:", process.env.SMPT_MAIL);
  console.log("SMTP Password:", process.env.SMPT_PASSWORD ? "******" : "not set");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sachinkaurav65@gmail.com",
      pass: "ptdllumbvicixbex",
    },
  });

  const mailInfo = {
    from: "sachinkaurav65@gmail.com",
    to: email,
    subject: subject,
    html: message,
  };

  await transporter.sendMail(mailInfo);
};

const requestDemoTemplate = (firstName, lastName, email, phoneNumber, age, language) => `
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #0073e6; text-align: center;">Request Demo</h2>
        <p style="font-size: 16px; line-height: 1.6;">Hello ShopNest Team,</p>
        <p style="font-size: 16px; line-height: 1.6;">You have a new demo request with the following details:</p>

        <table style="width: 100%; font-size: 16px; line-height: 1.6; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Name:</td>
            <td style="padding: 8px;">${firstName} ${lastName}</td>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
            <td style="padding: 8px;">${phoneNumber}</td>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 8px; font-weight: bold;">Age:</td>
            <td style="padding: 8px;">${age}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Language:</td>
            <td style="padding: 8px;">${language}</td>
          </tr>
        </table>

        <p style="font-size: 16px; line-height: 1.6;">Please reach out to them at your earliest convenience.</p>

        <p style="font-size: 16px; line-height: 1.6;">Regards,<br>Hindustani Tongue</p>
      </div>
    </body>
    </html>
`;


const orderUpdateTemplate = (orderID, status) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Status Update</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        font-size: 24px;
        margin-bottom: 20px;
      }
      p {
        margin: 10px 0;
      }
    </style>
  </head>
    <body>
      <div class="container">
        <h1>Order Status Update</h1>
        <p>Hello User,</p>
        <p>Your order with ID <strong>${orderID}</strong> has been updated.</p>
        <p>New status: <strong>${status}</strong></p>
        <p>If you have any questions or concerns, please feel free to contact us.</p>
        <p>Thank you for shopping with us!</p>
      </div>
    </body>
  </html>
`;

module.exports = {
  sendEmail,
  requestDemoTemplate,
  orderUpdateTemplate,
};
