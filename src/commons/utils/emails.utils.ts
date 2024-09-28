import { createTransport, Transporter } from 'nodemailer';

// Entities
import { User } from 'src/modules/users/entities/user.entity';

const transporter: Transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const setPasswordEmail = async ({
  data,
  token,
}: {
  data: User;
  token: string;
}) => {
  await transporter.sendMail({
    from: '"Save password 🔐" <Robler companies>',
    to: data.email,
    subject: `Hello ${data.firstName} ${data.lastName}`,
    html: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Correo Electrónico</title>
            <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .header {
                  padding: 20px;
              }
              .content {
                  padding: 20px;
              }
              .footer {
                  background-color: #f1f1f1;
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
              }
              a {
                  color: #007BFF;
                  text-decoration: none;
              }

              .button {
                background-color: #007BFF;
                color: #fff;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                border-radius: 5px;
                font-size: 16px;
                border: none; 
                cursor: pointer; 
              }   
                
              .button:hover {
                  background-color: #0056b3; 
              }
            </style>
        </head>
        <body>

        <div class="container">
            <div class="header">
                <h1>You have been invited as a role ${data?.role} in our application</h1>
            </div>
            <div class="content">
                <h2>Hello ${data?.firstName} ${data?.lastName},</h2>
                <p>You have been invited as a role in our application.</p>
                <br>
                <p>Please enter a password to register</p>
                <br>
                <a href="${process.env.APP_HOST}/invitationUser?token=${token}" class="button">
                  Accept Invitation
                </a>
                <br>
                <p>This email expires in the next 24 hours</p>
                <br>
                <p>Greetings,<br>${data?.firstName} ${data?.lastName}</p>
                <br>
                <a href="google.com">Visit our website</a>
            </div>
            <div class="footer">
                <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
            </div>
        </div>

        </body>
        </html>
    `,
  });
};
