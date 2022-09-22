const postgresql = require('../../database/postgresql');
const Utils = require('../../utils/parser');
const UserQueries = require('../user/user.queries');
const { addUserValues, updateUserValues, parsePatientFullName } = require('./user.map');

async function getOperators() {
  const client = await postgresql.getConnectionClient();
  try {
    const operatorsRes = await client.query(UserQueries.getOperators);

    return { data: Utils.toComboData(operatorsRes.rows, 'cod_usuario', 'nombres') };
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getPatientByUserCode(userCode) {
  const client = await postgresql.getConnectionClient();
  try {
    const operatorsRes = await client.query(UserQueries.getClientIdBy('usuarios.cod_usuario = $1'), [userCode]);

    return { data: operatorsRes.rows[0] };
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getUserByDoc(numDoc) {
  const client = await postgresql.getConnectionClient();
  try {
    const patient = await client.query(UserQueries.getClientIdBy('num_documento = $1'), [numDoc]);

    return { data: patient.rows[0] };
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getPatientByDoc(numDoc) {
  const client = await postgresql.getConnectionClient();
  try {
    const patient = await client.query(UserQueries.getPatientBy('num_documento = $1'), [numDoc]);

    return { data: patient.rows[0] };
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getPatientCombo() {
  const client = await postgresql.getConnectionClient();
  try {
    const patient = await client.query(UserQueries.getPatientBy());

    return { data: Utils.toComboData(parsePatientFullName(patient.rows), 'cod_paciente', 'nombre_paciente') };
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function updateUserPayment({ nombres, ape_paterno, ape_materno, email, cod_usuario }) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(
      UserQueries.updateUserPayment, 
      [nombres, ape_paterno, ape_materno, email, cod_usuario]
    );

    const userUpdated = await client.query(UserQueries.getClientIdBy('usuarios.cod_usuario = $1'), [cod_usuario]);

    await client.query('COMMIT');

    const mapUserUpdated = userUpdated.rows.map(u => ({
      nombres: u.nombres,
      ape_paterno: u.ape_paterno,
      ape_materno: u.ape_materno,
      email: u.email,
    }));

    return { data: mapUserUpdated[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function register(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    const operatorsRes = await client.query(UserQueries.register, addUserValues(payload));

    return { data: operatorsRes.rows[0] };
  } catch(err) {
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function update(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    const operatorsRes = await client.query(UserQueries.update, updateUserValues(payload));

    return { data: operatorsRes.rows[0] };
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

module.exports = {
  getOperators,
  getPatientByUserCode,
  getPatientCombo,
  getUserByDoc,
  getPatientByDoc,
  updateUserPayment,
  register,
  update,
}
