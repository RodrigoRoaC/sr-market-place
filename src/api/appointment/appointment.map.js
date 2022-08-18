const { parseDate, parseTime } = require("../../utils/parser");

const parseAppointment = ({
  fecha_programacion,
  fecha_autorizacion,
  hora_programacion,
  ...rest
}) => ({
  ...rest,
  fecha_programacion: parseDate(fecha_programacion),
  fecha_autorizacion: parseDate(fecha_autorizacion),
  hora_programacion: parseTime(hora_programacion),
})

const getUpdatePacientValues = ({
  nombres = null,
  apellido = null,
  departamento = null,
  provincia = null,
  distrito = null,
  email = null,
  direccion = null,
  telefono = null,
  cod_usuario
}) => ([
  nombres,
  apellido,
  departamento,
  provincia,
  distrito,
  email,
  direccion,
  telefono,
  cod_usuario
]);

const getPacientValues = ({
  nombres = null,
  apellido = null,
  edad = null,
  departamento = null,
  provincia = null,
  distrito = null,
  cod_tipo_doc = null,
  num_documento = null,
  email = null,
  direccion = null,
  telefono = null,
}) => ([
  cod_tipo_doc,
  num_documento,
  nombres,
  apellido,
  departamento,
  provincia,
  distrito,
  email,
  direccion,
  telefono,
]);

const getAppointmentValues = ({
  cod_paciente = null,
  cod_usuario = null,
  cod_tipo_atencion = null,
  cod_tipo_servicio = null,
  cod_modalidad = null,
  fecha_programacion = null,
  fecha_autorizacion = null,
  hora_programacion = null,
  sintomas = null,
  diagnostico = null,
  numero_autorizacion = null
}) => ([
  cod_paciente,
  cod_usuario,
  cod_tipo_atencion,
  cod_tipo_servicio,
  cod_modalidad,
  sintomas,
  diagnostico,
  fecha_programacion,
  hora_programacion,
  fecha_autorizacion,
  numero_autorizacion,
]);

const getUpdateAppointmentValues = ({
  cod_solicitud,
  cod_tipo_atencion = null,
  cod_tipo_servicio = null,
  cod_modalidad = null,
  fecha_programacion = null,
  fecha_autorizacion = null,
  hora_programacion = null,
  numero_autorizacion = null,
  sintomas = null,
  diagnostico = null
}) => ([
  cod_tipo_atencion,
  cod_tipo_servicio,
  cod_modalidad,
  sintomas,
  diagnostico,
  fecha_programacion,
  hora_programacion,
  fecha_autorizacion,
  numero_autorizacion,
  new Date(),
  cod_solicitud,
])

module.exports = {
  getUpdatePacientValues,
  getPacientValues,
  getAppointmentValues,
  parseAppointment,
  getUpdateAppointmentValues,
}
