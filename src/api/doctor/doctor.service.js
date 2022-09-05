const postgresql = require('../../database/postgresql');
const DoctorQueries = require('./doctor.queries');
const UserService = require('../user/user.service');
const { addDoctorValues, addAvaValues } = require('./doctor.map');
const { parseAvailabilityDates } = require('../../utils/parser');

async function list() {
  const client = await postgresql.getConnectionClient();
  try {
    const doctors = await client.query(DoctorQueries.list());

    return { data: doctors.rows };
  } catch(err) {
    console.error('An error occurred while fetching', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getVentanaHoraria() {
  const client = await postgresql.getConnectionClient();
  try {
    const appointments = await client.query(DoctorQueries.getVentanaHoraria);

    return { data: appointments.rows };
  } catch(err) {
    console.error('An error occurred while fetching', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getEspecialidades() {
  const client = await postgresql.getConnectionClient();
  try {
    const appointments = await client.query(DoctorQueries.getEspecialidades);

    return { data: appointments.rows };
  } catch(err) {
    console.error('An error occurred while fetching', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function register(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    const userRes = await UserService.register(payload);
    if (userRes.error) {
      throw new Error('Error al registrar usuario');
    }

    const doctor = await client.query(DoctorQueries.register, addDoctorValues({ ...payload, cod_usuario: userRes.data.cod_usuario }));
    const [fec_ini, fec_fin] = parseAvailabilityDates(payload.range_dates);
    const mapAvaPromises = payload.range_time.map(
      ven_hor => client.query(
        DoctorQueries.registerAvailability, 
        addAvaValues({ cod_resp: payload.cod_resp, fec_ini, fec_fin, ven_hor, cod_doctor: doctor.rows[0].cod_doctor })
      )
    );

    await Promise.all(mapAvaPromises);
    const doctors = await client.query(DoctorQueries.list(`cod_doctor = ${doctor.rows[0].cod_doctor}`));

    await client.query('COMMIT');

    return { data: doctors.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.error('An error occurred while fetching', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

module.exports = {
  list,
  getVentanaHoraria,
  getEspecialidades,
  register,
}
