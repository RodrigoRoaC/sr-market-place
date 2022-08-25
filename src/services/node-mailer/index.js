const Config = require('../../utils/config');
const { createTransport } = require('nodemailer');

const config = Config.get();

const sendEmail = async ({ email, nombres, ape_paterno, ape_materno, link_pago, cod_pago }) => {
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
      subject: 'Market Place CMD Test',
      html: `<p>${cod_pago} - ${nombres} ${ape_paterno} ${ape_materno}:: ${link_pago}<p>`,
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
