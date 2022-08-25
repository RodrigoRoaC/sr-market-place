const Config = require('../../utils/config');
const { createTransport } = require('nodemailer');
const { getEmailTemplate } = require('./templates');

const config = Config.get();

const sendEmail = async ({ template, email, subject, ...infoObj }) => {
  const { host, name, pass, port, replyToMail, replyToName, user, cc } = config.service.mail;

  const transporter = createTransport({
    host,
    port,
    auth: {
      pass,
      user,
    },
  });

  try {
    const response = await transporter.sendMail({
      attachments: [],
      bcc: [],
      cc,
      from: `"${name}" <${user}>`,
      replyTo: `"${replyToName}" <${replyToMail}>`,
      subject: subject || 'Market Place CMD Test',
      html: getEmailTemplate(template, infoObj),
      to: email,
    });

    return { error: false, details: response }
  } catch (error) {

    return { error: true, details: error };
  }
};

module.exports = {
  sendEmail, 
}
