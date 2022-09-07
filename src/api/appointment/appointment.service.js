const postgresql = require('../../database/postgresql');
const { addAppointmentValues } = require('./appointment.map');
const AppointmentQueries = require('./appointment.queries');

async function getAppointments({ fecha_programacion }) {
  const client = await postgresql.getConnectionClient();
  try {
    const appointmentData = await client.query(
      AppointmentQueries.getAppointments(`s.fecha_programacion >= $1`, 's.fecha_programacion desc'),
      [fecha_programacion]
    );

    return { data: appointmentData.rows };
  } catch(err) {
    console.error('An error occurred while getAppointments', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getAppointmentsBy({ cod_doctor, fecha_reserva }) {
  const client = await postgresql.getConnectionClient();
  try {
    const appointmentData = await client.query(
      AppointmentQueries.getAppointments(`c.cod_doctor = $1 AND ds.fecha_reserva >= $2`, 'ds.fecha_reserva desc'),
      [cod_doctor, fecha_reserva]
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

module.exports = {
  getAppointments,
  getAppointmentsBy,
  register,
}
