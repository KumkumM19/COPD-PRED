const HTML_TEMPLATE = (text) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>COPD Pred - Account Notification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            padding: 20px;
            background-color: #e9f5f5;
          }
          .email {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .email-header {
            background-color: #004d40;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .email-body {
            padding: 20px;
            text-align: left;
            color: #333;
            line-height: 1.6;
          }
          .email-body p {
            margin: 0 0 10px;
          }
          .email-footer {
            background-color: #004d40;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 0 0 8px 8px;
          }
          .email-footer p {
            margin: 0;
            font-size: 14px;
          }
          .cta-button {
            display: inline-block;
            background-color: #00796b;
            color: #fff !important;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <h1>COPD Pred</h1>
            </div>
            <div class="email-body">
              <p>${text}</p>
              <a href="http://localhost:5173/" class="cta-button">Log in to your account</a>
            </div>
            <div class="email-footer">
              <p>Thank you for choosing COPD Pred. Stay healthy!</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = HTML_TEMPLATE;
