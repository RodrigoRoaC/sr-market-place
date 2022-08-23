const postgresql = require('../../database/postgresql');

async function getPayments(operatorId) {
  const client = await postgresql.getConnectionClient();
  try {

    return {}; 
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getPaymentsByPatient(patientId) {
  const client = await postgresql.getConnectionClient();
  try {

    return {}; 
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function add(body) {
  const client = await postgresql.getConnectionClient();
  try {

    return {}; 
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function update(body) {
  const client = await postgresql.getConnectionClient();
  try {

    return {}; 
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function remove(body) {
  const client = await postgresql.getConnectionClient();
  try {

    return {}; 
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function sendLinkToEmail(body) {
  const client = await postgresql.getConnectionClient();
  try {

    return {}; 
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
}
