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

const addAppointmentValues = ({
  cod_paciente = null,
  cod_usuario = null,
  cod_tipo_atencion = null,
  cod_tipo_servicio = null,
  cod_modalidad = null,
  fecha_programacion = null,
  hora_programacion = null,
  sintomas = null,
  diagnostico = null,
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
]);

const updateAppointmentValues = ({
  cod_solicitud,
  cod_tipo_atencion = null,
  cod_tipo_servicio = null,
  cod_modalidad = null,
  fecha_programacion = null,
  hora_programacion = null,
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
  new Date(),
  cod_solicitud,
]);

module.exports = {
  addAppointmentValues,
  parseAppointment,
  updateAppointmentValues,
}
