const postgresql = require('../../database/postgresql');
const DoctorQueries = require('./doctor.queries');
const UserService = require('../user/user.service');
const { addDoctorValues, addAvaValues, getVenHorariaValues, updateDoctorValues } = require('./doctor.map');
const { parseAvailabilityDates, parseDateToString } = require('../../utils/parser');

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

async function getDoctor(cod_usuario) {
  const client = await postgresql.getConnectionClient();
  try {
    const doctors = await client.query(DoctorQueries.list(`usuarios.cod_usuario = ${cod_usuario}`));

    return { data: doctors.rows[0] };
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

async function getVentanaHorariaByDate(params) {
  const client = await postgresql.getConnectionClient();
  try {
    const appointments = await client.query(DoctorQueries.getVentanaHorariaByDate, getVenHorariaValues(params));

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

    const userRes = await UserService.register({ ...payload, cod_perfil: 5, clave: payload.num_documento });
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

async function update(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    const userRes = await UserService.update(payload);
    if (userRes.error) {
      throw new Error('Error al actualizar usuario');
    }

    await client.query(DoctorQueries.update, updateDoctorValues(payload));
    const fec_ini = parseDateToString(payload.fecha_reserva);
    await client.query(DoctorQueries.deleteAvailabilityByDate, [payload.cod_doctor, fec_ini]);
    const mapAvaPromises = payload.range_time.map(
      ven_hor => client.query(
        DoctorQueries.registerAvailability, 
        addAvaValues({ cod_resp: payload.cod_resp, fec_ini, fec_fin: fec_ini, ven_hor, cod_doctor: payload.cod_doctor })
      )
    );

    await Promise.all(mapAvaPromises);
    const doctors = await client.query(DoctorQueries.list(`cod_doctor = ${payload.cod_doctor}`));

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

async function getComboDoctor(cod_especialidad, cod_tipo_atencion) {
  const client = await postgresql.getConnectionClient();
  try {
    const doctors = await client.query(
      DoctorQueries.list(`especialidad.cod_especialidad = ${cod_especialidad} AND doctores.cod_tipo_atencion = ${cod_tipo_atencion}`)
    );

    return { data: doctors.rows };
  } catch(err) {
    console.error('An error occurred while fetching', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

module.exports = {
  list,
  getDoctor,
  getComboDoctor,
  getVentanaHoraria,
  getVentanaHorariaByDate,
  getEspecialidades,
  register,
  update,
}
