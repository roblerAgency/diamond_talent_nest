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
    from: '"Save password 🔐" <diamondtalent@vlakov.agency>',
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

export const archiveUserEmail = async ({ data }: { data: User }) => {
  await transporter.sendMail({
    from: '"Archive account📦" <diamondtalent@vlakov.agency>',
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
          </style>
      </head>
      <body>

      <div class="container">
          <div class="header">
              <h1>Your account has been archived</h1>
          </div>
          <div class="content">
              <h2>Hello ${data?.firstName} ${data?.lastName},</h2>
              <p>Your account has been archived for time, you will be notified when your account is reactivated.</p>
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

export const activeUserEmail = async ({ data }: { data: User }) => {
  await transporter.sendMail({
    from: '"Active account📍" <diamondtalent@vlakov.agency>',
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
          </style>
      </head>
      <body>

      <div class="container">
          <div class="header">
              <h1>Your account has been reactivated</h1>
          </div>
          <div class="content">
              <h2>Hello ${data?.firstName} ${data?.lastName},</h2>
              <p>Your account has been successfully activated. You can now log in and access your features.</p>
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

export const verifyUserEmail = async ({ data }: { data: User }) => {
  await transporter.sendMail({
    from: '"Active account✅" <diamondtalent@vlakov.agency>',
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
          </style>
      </head>
      <body>

      <div class="container">
          <div class="header">
              <h1>Your account has been verified</h1>
          </div>
          <div class="content">
              <h2>Hello ${data?.firstName} ${data?.lastName},</h2>
              <p>Your account has been successfully verified. You can now enjoy full access to all features of our application.</p>
              <br>
              <p>Thank you for your patience and welcome aboard!</p>
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

export const rejectedsUserEmail = async ({ data }: { data: User }) => {
  await transporter.sendMail({
    from: '"Rejected account🎯" <diamondtalent@vlakov.agency>',
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
          </style>
      </head>
      <body>

      <div class="container">
          <div class="header">
              <h1>Your account has been rejected</h1>
          </div>
          <div class="content">
              <h2>Hello ${data?.firstName} ${data?.lastName},</h2>
              <p>We regret to inform you that your account application has been rejected. This decision was made based on our verification criteria.</p>
              <br>
              <p>If you believe this is an error or if you have any questions, please feel free to contact our support team.</p>
              <br>
              <p>Thank you for your understanding.</p>
              <br>
              <p>Best regards,<br>${data?.firstName} ${data?.lastName}</p>
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

export const registerSuccessfulUserEmail = async ({ data }: { data: User }) => {
  await transporter.sendMail({
    from: '"Active account💡" <diamondtalent@vlakov.agency>',
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
            </style>
        </head>
        <body>

        <div class="container">
            <div class="header">
                <h1>Your registration was successful</h1>
            </div>
            <div class="content">
                <h2>Hello ${data?.firstName} ${data?.lastName},</h2>
                <p>Congratulations! Your registration has been successfully completed. You can now log in and start exploring all the features of our application.</p>
                <br>
                <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                <br>
                <p>Welcome aboard!</p>
                <br>
                <p>Best regards,<br>${data?.firstName} ${data?.lastName}</p>
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

export const deleteUserEmail = async ({ data }: { data: User }) => {
  await transporter.sendMail({
    from: '"Delete account🗑️" <diamondtalent@vlakov.agency>',
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
            </style>
        </head>
        <body>

        <div class="container">
            <div class="header">
                <h1>Your account has been deleted</h1>
            </div>
            <div class="content">
                <h2>Hello ${data?.firstName} ${data?.lastName},</h2>
                <p>We regret to inform you that your account has been successfully deleted. If this was done in error or if you have any questions, please contact our support team for assistance.</p>
                <br>
                <p>Thank you for being a part of our community.</p>
                <br>
                <p>Best regards,<br>${data?.firstName} ${data?.lastName}</p>
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
