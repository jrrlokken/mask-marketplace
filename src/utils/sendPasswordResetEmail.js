import { getTestMessageUrl } from 'nodemailer';
import { makeEmail, transport } from './mail';

export default async function sendPasswordResetEmail (resetToken, to) {
  const info = await transport.sendMail({
    from: 'jrrlokken@gmail.com',
    to,
    subject: 'Your Password Reset Token',
    html: makeANiceEmail(`Your Password Reset Token is here.
      \n\n
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
  }).catch(err => {
    console.log(`Error Sending Mail: `, err);
  });

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Sent! Preview: `, getTestMessageUrl(info));
  }
}