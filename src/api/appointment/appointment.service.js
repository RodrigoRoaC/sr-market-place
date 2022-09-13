const postgresql = require('../../database/postgresql');
const { addAppointmentValues, updateAppointmentValues } = require('./appointment.map');
const AppointmentQueries = require('./appointment.queries');

async function getAppointments() {
  const client = await postgresql.getConnectionClient();
  try {
    const appointmentData = await client.query(
      AppointmentQueries.getAppointments(null, 's.fecha_programacion desc')
    );

    return { data: appointmentData.rows };
  } catch(err) {
    console.error('An error occurred while getAppointments', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getAppointmentsBy({ cod_doctor }) {
  const client = await postgresql.getConnectionClient();
  try {
    const appointmentData = await client.query(
      AppointmentQueries.getAppointments(`c.cod_doctor = $1`, 'ds.fecha_reserva desc'),
      [cod_doctor]
    );

    return { data: appointmentData.rows };
  } catch(err) {
    console.error('An error occurred while getAppointments', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function register(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    const appointmentAdded = await client.query(
      AppointmentQueries.register,
      addAppointmentValues(payload)
    );

    const appointmentData = await client.query(
      AppointmentQueries.getAppointments('c.cod_cita = $1'), 
      [appointmentAdded.rows[0].cod_cita]
    );

    await client.query('COMMIT');

    return { data: appointmentData.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.error('An error occurred while getAppointments', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function update(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    const appointmentAdded = await client.query(
      AppointmentQueries.update,
      updateAppointmentValues(payload)
    );

    const appointmentData = await client.query(
      AppointmentQueries.getAppointments('c.cod_cita = $1'), 
      [appointmentAdded.rows[0].cod_cita]
    );

    await client.query('COMMIT');

    return { data: appointmentData.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.error('An error occurred while getAppointments', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function cancel(payload) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    const resp = await client.query(
      AppointmentQueries.close,
      [payload.cod_cita, payload.cod_usuario]
    );
      console.log(resp.rows);
    const appointmentData = await client.query(
      AppointmentQueries.getAppointments('c.cod_cita = $1'),
      [payload.cod_cita]
    );

    await client.query('COMMIT');

    return { data: appointmentData.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.error('An error occurred while getAppointments', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

module.exports = {
  getAppointments,
  getAppointmentsBy,
  register,
  update,
  cancel,
}
