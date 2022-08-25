const paymentLink = ({ 
  cod_pago,
  nombres,
  ape_paterno,
  ape_materno,
  link_pago,
}) => `<p>${cod_pago} - ${nombres} ${ape_paterno} ${ape_materno}:: ${link_pago}<p>`;

const confirmPayment = ({
  cod_pago,
  nombres,
  ape_paterno,
  ape_materno,
  deducible,
  copago,
}) => `
  <h1>Comprobante de pago: ${cod_pago}</h1>
  <p>${nombres} ${ape_paterno} ${ape_materno}</p>
  <p>Deducible: ${deducible} - Copago: ${copago}</p>
  <p>¡El pago ha sido exitoso!</p>
`;

const getEmailTemplate = (template, infoObj) => {
  switch(template) {
    case 'paymentLink':
      return paymentLink(infoObj);
    case 'confirmPayment': 
      return confirmPayment(infoObj);
  }
}

module.exports = {
  getEmailTemplate,
}
