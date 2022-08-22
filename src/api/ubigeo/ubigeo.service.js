const postgresql = require('../../database/postgresql');
const UbigeoQueries = require('./ubigeo.queries');

async function getDepartamentos() {
  const client = await postgresql.getConnectionClient();
  try {
    const departamentoData = await client.query(UbigeoQueries.getDepartamentos);

    return { data: departamentoData.rows };
  } catch(err) {
    console.error('An error occurred while getDepartamentos', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getProvincias({ departamento }) {
  const client = await postgresql.getConnectionClient();
  try {
    const provinciaData = await client.query(UbigeoQueries.getProvincias, [departamento]);

    return { data: provinciaData.rows };
  } catch(err) {
    console.error('An error occurred while getProvincias', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getDistritos({ departamento, provincia }) {
  const client = await postgresql.getConnectionClient();
  try {
    const distritoData = await client.query(UbigeoQueries.getDistritos, [departamento, provincia]);

    return { data: distritoData.rows };
  } catch(err) {
    console.error('An error occurred while getDistritos', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

module.exports = {
  getDepartamentos,
  getProvincias,
  getDistritos,
}
