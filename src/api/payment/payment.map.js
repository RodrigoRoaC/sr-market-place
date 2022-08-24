const addPaymentValues = ({
  cod_solicitud, 
  cod_estado, 
  link_pago, 
  deducible, 
  copago = null, 
  numero_boleta = null, 
  numero_autorizacion = null,
  fecha_autorizacion = null, 
  observaciones = null, 
}) => ([
  cod_solicitud,
  cod_estado,
  link_pago,
  deducible,
  copago,
  numero_boleta,
  numero_autorizacion,
  fecha_autorizacion,
  observaciones,
]);

const updatePaymentValues = ({
  link_pago = null,
  deducible = null,
  copago = null,
  numero_boleta = null,
  numero_autorizacion = null,
  fecha_autorizacion = null,
  observaciones = null,
  fec_actualizacion = null,
  cod_pago = null,
}) => ([
  link_pago,
  deducible,
  copago,
  numero_boleta,
  numero_autorizacion,
  fecha_autorizacion,
  observaciones,
  fec_actualizacion,
  cod_pago,
])

module.exports = {
  addPaymentValues,
  updatePaymentValues,
}
