const postgresql = require('../../database/postgresql');
const { getPacientValues, getAppointmentValues, parseAppointment, getUpdatePacientValues, getUpdateAppointmentValues } = require('./appointment.map');
const AppointmentQueries = require('./appointment.querys');

async function getByOperatorId(id) {
  const client = await postgresql.getConnectionClient();
  try {
    const appointments = await client.query(
      AppointmentQueries.getAppointmentBy('solicitud.cod_usuario = $1'), 
      [id]
    );

    return { data: appointments.rows };
  } catch(err) {
    console.error('An error occurred while fetching', err);

    return { error: true, details: err }
  } finally {
    client.release();
  }
}

async function add(appointment) {
  const client = await postgresql.getConnectionClient();
  const formatAppointment = parseAppointment(appointment);
  try {
    await client.query('BEGIN');

    const patient = await client.query(
      'SELECT * FROM usuarios INNER JOIN pacientes ON pacientes.cod_usuario = usuarios.cod_usuario WHERE num_documento = $1',
      [formatAppointment.num_documento]
    );
    let cod_paciente = patient.rows[0]?.cod_paciente;
    if (cod_paciente) {
      await client.query(
        `UPDATE usuarios 
          SET nombres = $1, ape_paterno = $2, departamento = $3, provincia = $4, distrito = $5, email = $6, direccion = $7, telefono1 = $8 WHERE cod_usuario = $9`,
        [...getUpdatePacientValues({ ...appointment, cod_usuario: patient.rows[0]?.cod_usuario })]
      );
    } else {
      const newUser = await client.query(
        `INSERT INTO 
          usuarios(cod_usuario, cod_tipo_doc, num_documento, nombres, ape_paterno, departamento, provincia, distrito, email, direccion, telefono1, cod_perfil, fec_registro, fec_actualizacion) 
        VALUES(nextval('seq_cod_usuario'), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING cod_usuario`,
        [...getPacientValues(formatAppointment)]
      );
      const newPatient = await client.query(
        `INSERT INTO 
          pacientes(cod_paciente, cod_usuario, cod_plan, fec_registro, fec_actualizacion)
          VALUES(nextval('seq_cod_paciente'), $1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING cod_paciente`,
        [newUser.rows[0].cod_usuario, formatAppointment.cod_tipo_plan]
      );
      cod_paciente = newPatient.rows[0].cod_paciente;
    }

    const newSolicitud = await client.query(AppointmentQueries.insert, getAppointmentValues({ ...formatAppointment, cod_paciente }));

    const appointments = await client.query(
      AppointmentQueries.getAppointmentBy('solicitud.cod_solicitud = $1'), 
      [newSolicitud.rows[0].cod_solicitud]
    );

    await client.query('COMMIT');

    return { data: appointments.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');

    return { error: true, details: err }
  } finally {
    client.release();
  }
}

async function update(appointment) {
  const client = await postgresql.getConnectionClient();
  const formatAppointment = parseAppointment(appointment);
  try {
    await client.query('BEGIN');
    const patientUser = await client.query(
      'SELECT * FROM pacientes where pacientes.cod_paciente = $1',
      [formatAppointment.cod_paciente]
    );

    if (formatAppointment.cod_plan) {
      await client.query(
        'UPDATE pacientes SET cod_plan = $1, fec_actualizacion = $2 WHERE pacientes.cod_paciente = $3',
        [formatAppointment.cod_plan, new Date(), formatAppointment.cod_paciente]
      );
    }

    await client.query(
      `UPDATE usuarios 
        SET nombres = $1, ape_paterno = $2, departamento = $3, provincia = $4, distrito = $5, email = $6, direccion = $7, telefono1 = $8 WHERE cod_usuario = $9`,
      [...getUpdatePacientValues({ ...appointment, cod_usuario: patientUser.rows[0]?.cod_usuario })]
    );

    await client.query(
      `UPDATE solicitud
        SET cod_tipo_atencion = $1, cod_tipo_servicio = $2, cod_modalidad = $3, sintomas = $4, diagnostico = $5, fecha_programacion = $6, hora_programacion = $7, fecha_autorizacion = $8, numero_autorizacion = $9, fec_actualizacion = $10
        WHERE cod_solicitud = $11`,
      [...getUpdateAppointmentValues(formatAppointment)]
    );

    const appointments = await client.query(
      AppointmentQueries.getAppointmentBy('solicitud.cod_solicitud = $1'), 
      [appointment.cod_solicitud]
    );

    await client.query('COMMIT');

    return { data: appointments.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');
    console.log(err);
    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function assignToOperator(assignObj) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(
      'UPDATE solicitud SET cod_usuario = $1 WHERE cod_solicitud = $2',
      [assignObj.cod_usuario, assignObj.cod_solicitud]
    );

    await client.query('COMMIT');
  } catch(err) {
    await client.query('ROLLBACK');

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

module.exports = {
  getByOperatorId,
  add,
  update,
  assignToOperator,
}
