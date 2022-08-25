const postgresql = require('../../database/postgresql');
const { addPaymentValues, updatePaymentValues } = require('./payment.map');
const PaymentQueries = require('./payment.queries');

async function getPayments(operatorId) {
  const client = await postgresql.getConnectionClient();
  try {
    const payments = await client.query(
      PaymentQueries.getPaymentsBy({ whereParams: 'solicitud.cod_usuario = $1' }),
      [operatorId]
    );

    return { data: payments.rows }; 
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getPaymentsByPatient(patientId) {
  const client = await postgresql.getConnectionClient();
  try {
    const payments = await client.query(
      PaymentQueries.getPaymentsBy({ whereParams: 'solicitud.cod_paciente = $1' }),
      [patientId]
    );

    return { data: payments.rows }; 
  } catch(err) {
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function add(body) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    const newPayment = await client.query(
      PaymentQueries.insert,
      addPaymentValues(body)
    );

    const paymentAdded = await client.query(
      PaymentQueries.getPaymentsBy({ whereParams: 'pagos.cod_pago = $1' }),
      [newPayment.rows[0].cod_pago]
    );

    await client.query('COMMIT');

    return { data: paymentAdded.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function update(body) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(PaymentQueries.update, updatePaymentValues(body));

    const paymentUpdated = await client.query(
      PaymentQueries.getPaymentsBy({ whereParams: 'pagos.cod_pago = $1' }),
      [body.cod_pago]
    );

    await client.query('COMMIT');

    return { data: paymentUpdated.rows[0] }; 
  } catch(err) {
    await client.query('ROLLBACK');

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function remove(body) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query(
      PaymentQueries.remove,
      [new Date(), body.cod_pago]
    );

    const paymentRemoved = await client.query(
      PaymentQueries.getPaymentsBy({ whereParams: 'pagos.cod_pago = $1' }),
      [body.cod_pago]
    );

    return { error: false, data: paymentRemoved.rows[0] }; 
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function sendLinkToEmail(body) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query(
      PaymentQueries.updateLink,
      [body.cod_pago, body.link_pago]
    );

    return { error: false }; 
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function updateState(body) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(PaymentQueries.changeState, [body.cod_estado, body.cod_pago]);

    const paymentUpdated = await client.query(
      PaymentQueries.getPaymentsBy({ whereParams: 'pagos.cod_pago = $1' }),
      [body.cod_pago]
    );

    await client.query('COMMIT');

    return { data: paymentUpdated.rows[0] }; 
  } catch(err) {
    await client.query('ROLLBACK');
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function sendLinkToEmail(body) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query(
      PaymentQueries.updateLink,
      [body.cod_pago, body.link_pago]
    );

    return { error: false }; 
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

module.exports = {
  getPayments,
  getPaymentsByPatient,
  add,
  update,
  remove,
  sendLinkToEmail,
  updateState,
}
