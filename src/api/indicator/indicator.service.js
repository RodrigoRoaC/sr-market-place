const postgresql = require('../../database/postgresql');
const { mapRegisterValues, mapRegisterMaeValues, mapUpdateMaeValues, mapUpdateValues } = require('./indicator.map');
const IndicatorQueries = require('./indicator.queries');

async function list() {
  const client = await postgresql.getConnectionClient();
  try {
    const indicatorRes = await client.query(IndicatorQueries.getBy({}));

    return { data: indicatorRes.rows };
  } catch(err) {
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function listBy({ cod_mae_indicator, cod_patient }) {
  const client = await postgresql.getConnectionClient();
  try {
    const whereParams = `pacientes.cod_paciente = ${cod_patient} AND indicadores.cod_mae_indicator = ${cod_mae_indicator}`;
    const orderParams = 'indicadores.fec_atencion asc';
    const indicatorRes = await client.query(IndicatorQueries.getBy({ whereParams, orderParams }));

    return { data: indicatorRes.rows };
  } catch(err) {
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function register(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(IndicatorQueries.register, mapRegisterValues(payload));

    await client.query('COMMIT');

    return { error: false };
  } catch(err) {
    await client.query('ROLLBACK');
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function update(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(IndicatorQueries.update, mapUpdateValues(payload));

    const indicatorUpdated = await client.query(
      IndicatorQueries.getBy({ whereParams: 'cod_indicator = $1' }),
      [payload.cod_indicator]
    );

    await client.query('COMMIT');

    return { data: indicatorUpdated.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function remove(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(IndicatorQueries.remove, [payload.cod_indicator]);

    await client.query('COMMIT');

    return { error: false };
  } catch(err) {
    await client.query('ROLLBACK');
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function listMae() {
  const client = await postgresql.getConnectionClient();
  try {
    const indicatorRes = await client.query(IndicatorQueries.getMaeBy({}));

    return { data: indicatorRes.rows };
  } catch(err) {
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function registerMae(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    const indicatorAdded = await client.query(IndicatorQueries.registerMae, mapRegisterMaeValues(payload));

    const indicatorUpdated = await client.query(
      IndicatorQueries.getMaeBy({ whereParams: 'cod_mae_indicator = $1' }),
      [indicatorAdded.rows[0].cod_mae_indicator]
    );

    await client.query('COMMIT');

    return { data: indicatorUpdated.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function updateMae(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(IndicatorQueries.updateMae, mapUpdateMaeValues(payload));

    const indicatorUpdated = await client.query(
      IndicatorQueries.getMaeBy({ whereParams: 'cod_mae_indicator = $1' }),
      [payload.cod_mae_indicator]
    );

    await client.query('COMMIT');

    return { data: indicatorUpdated.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

module.exports = {
  list,
  listBy,
  register,
  update,
  remove,
  listMae,
  registerMae,
  updateMae,
}
