const postgresql = require('../../database/postgresql');
const { toComboData } = require('../../utils/parser');
const { addAppointmentValues, parseAppointment, updateAppointmentValues, addUserValues, updateUserValues } = require('./appointment.map');
const AppointmentQueries = require('./appointment.queries');
const UserQueries = require('../user/user.queries');
const UbigeoQueries = require('../ubigeo/ubigeo.queries');

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

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function add(appointment) {
  const client = await postgresql.getConnectionClient();
  const formatAppointment = parseAppointment(appointment);

  try {
    await client.query('BEGIN');

    const patient = await client.query(UserQueries.getClientIdBy('num_documento = $1'), [formatAppointment.num_documento]);
    let cod_paciente = patient.rows[0]?.cod_paciente;
    if (cod_paciente) {
      await client.query(UserQueries.update, updateUserValues({ ...appointment, cod_usuario: patient.rows[0]?.cod_usuario }));
    } else {
      const newUser = await client.query(UserQueries.register, addUserValues(formatAppointment));
      const newPatient = await client.query(
        UserQueries.registerPatient,
        [newUser.rows[0].cod_usuario, formatAppointment.cod_plan]
      );
      cod_paciente = newPatient.rows[0].cod_paciente;
    }

    const newSolicitud = await client.query(AppointmentQueries.insert, addAppointmentValues({ ...formatAppointment, cod_paciente }));

    const appointments = await client.query(
      AppointmentQueries.getAppointmentBy('solicitud.cod_solicitud = $1'), 
      [newSolicitud.rows[0].cod_solicitud]
    );

    await client.query('COMMIT');

    return { data: appointments.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');

    return { error: true, details: err };
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
      UserQueries.getPatientBy('pacientes.cod_paciente = $1'),
      [formatAppointment.cod_paciente]
    );

    const codPatientUser = patientUser.rows[0]?.cod_usuario;
    if (!codPatientUser) {
      return { error: true, details: { message: 'Patient user not found' } };
    }

    if (formatAppointment.cod_plan) {
      await client.query(
        UserQueries.updatePatientPlan,
        [formatAppointment.cod_plan, new Date(), formatAppointment.cod_paciente]
      );
    }

    await client.query(UserQueries.update, updateUserValues({ ...appointment, cod_usuario: codPatientUser }));

    await client.query(AppointmentQueries.update, updateAppointmentValues(formatAppointment));

    const appointments = await client.query(
      AppointmentQueries.getAppointmentBy('solicitud.cod_solicitud = $1'), 
      [appointment.cod_solicitud]
    );

    await client.query('COMMIT');

    return { data: appointments.rows[0] };
  } catch(err) {
    await client.query('ROLLBACK');

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function assignToOperator(assignObj) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(AppointmentQueries.assignTo, [assignObj.cod_usuario, new Date(), assignObj.cod_solicitud]);

    await client.query('COMMIT');

    return { data: { message: 'Assign appointment successful' } };
  } catch(err) {
    await client.query('ROLLBACK');

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function getComboData() {
  const client = await postgresql.getConnectionClient();
  try {
    const departamentoRes = await client.query(UbigeoQueries.getDepartamentos);
    const tipoDocumentoRes = await client.query('SELECT * FROM tipo_documento');

    const [planes, iafa, atencion, servicio, modalidad] = await Promise.all([
      client.query('SELECT * FROM planes_salud'),
      client.query('SELECT * FROM iafa'),
      client.query('SELECT * FROM tipo_atencion'),
      client.query('SELECT * FROM tipo_servicio'),
      client.query('SELECT * FROM modalidad'),
    ]);

    const departamento = toComboData(departamentoRes.rows, 'departamento', 'descripcion');
    const tipoDocumento = toComboData(tipoDocumentoRes.rows, 'cod_tipo_doc', 'desc_corta');
    const planesData = toComboData(planes.rows, 'cod_plan', 'desc_plan');
    const iafaData = toComboData(iafa.rows, 'cod_iafa', 'nom_iafa');
    const atencionData = toComboData(atencion.rows, 'cod_tipo_atencion', 'descripcion');
    const servicioData = toComboData(servicio.rows, 'cod_tipo_servicio', 'descripcion');
    const modalidadData = toComboData(modalidad.rows, 'cod_modalidad', 'descripcion');

    const data = { departamento, tipoDocumento, planesData, iafaData, atencionData, servicioData, modalidadData };
    return { data };
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

async function remove(body) {
  const client = await postgresql.getConnectionClient();
  try {
    await client.query('BEGIN');

    await client.query(AppointmentQueries.remove, [body.cod_solicitud]);

    await client.query('COMMIT');

    return { data: body.cod_solicitud };
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
  getComboData,
  remove,
}
