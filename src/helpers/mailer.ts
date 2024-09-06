import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Generate and save verify token and expiration time for email verification.
    const verifyToken = await bcryptjs.hash(userId.toString(), 10);
    const expiresIn = 60 * 60 * 1000;
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: verifyToken,
          verifyTokenExpires: Date.now() + expiresIn,
        },
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: verifyToken,
          forgotPasswordTokenExpires: Date.now() + expiresIn,
        },
      });
    }
    const transport = nodemailer.createTransport({
      host: String(process.env.MAILTRAP_HOST),
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: String(process.env.MAILTRAP_AUTH_USER),
        pass: String(process.env.MAILTRAP_AUTH_PASSWORD),
      },
    });

    const mailOptions = {
      from: 'maddison53@ethereal.email',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>
        Click <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${verifyToken}">Here</a> to
        ${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'}
        or copy and paste the link below your browser.
        <br /> ${process.env.DOMAIN}/verifyemail?token=${verifyToken}
      </p>`,
    };

    const emailsResponses = await transport.sendMail(mailOptions);
    return emailsResponses;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendEmail;
