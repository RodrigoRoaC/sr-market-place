const { parseDate, parseTime } = require("../../utils/parser");

const parseAppointment = ({
  fec_nacimiento,
  fecha_programacion,
  fecha_autorizacion,
  hora_programacion,
  ...rest
}) => ({
  ...rest,
  fec_nacimiento: parseDate(fec_nacimiento),
  fecha_programacion: parseDate(fecha_programacion),
  fecha_autorizacion: parseDate(fecha_autorizacion),
  hora_programacion: parseTime(hora_programacion),
})

const updateUserValues = ({
  nombres = null,
  ape_paterno = null,
  ape_materno = null,
  fec_nacimiento,
  departamento = null,
  provincia = null,
  distrito = null,
  email = null,
  direccion = null,
  telefono1 = null,
  telefono2 = null,
  cod_usuario
}) => ([
  nombres,
  ape_paterno,
  ape_materno,
  fec_nacimiento,
  departamento,
  provincia,
  distrito,
  email,
  direccion,
  telefono1,
  telefono2,
  cod_usuario
]);

const addUserValues = ({
  nombres = null,
  ape_paterno = null,
  ape_materno = null,
  fec_nacimiento = null,
  departamento = null,
  provincia = null,
  distrito = null,
  cod_tipo_doc = null,
  num_documento = null,
  email = null,
  direccion = null,
  telefono1 = null,
  telefono2 = null,
}) => ([
  cod_tipo_doc,
  num_documento,
  nombres,
  ape_paterno,
  ape_materno,
  fec_nacimiento,
  departamento,
  provincia,
  distrito,
  email,
  direccion,
  telefono1,
  telefono2,
]);

const addAppointmentValues = ({
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
  (cod_tipo_atencion || null),
  (cod_tipo_servicio || null),
  cod_modalidad,
  sintomas,
  diagnostico,
  fecha_programacion,
  hora_programacion,
  fecha_autorizacion,
  numero_autorizacion,
]);

const updateAppointmentValues = ({
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
  updateUserValues,
  addUserValues,
  addAppointmentValues,
  parseAppointment,
  updateAppointmentValues,
}
