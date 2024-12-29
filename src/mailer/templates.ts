export const sendMailTemplate = (content: string, link: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Claim Your Reward</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      color: #333;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #2c7efb;
      text-align: center;
    }
    p {
      margin: 20px 0;
      font-size: 16px;
      text-align: center;
    }
    a {
      display: inline-block;
      text-decoration: none;
      background: #2c7efb;
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      text-align: center;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Congratulations!</h1>
    <p>
      ${content}
    </p>
    <p>
      <a href="${link}" target="_blank">follow this link</a>
    </p>
    <p class="footer">
      If you did not request this reward or believe this email was sent in error, please disregard it.
    </p>
  </div>
</body>
</html>
`;
