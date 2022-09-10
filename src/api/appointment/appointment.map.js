const { parseDateToString } = require("../../utils/parser");

const addAppointmentValues = ({
  cod_solicitud = null,
  cod_doctor = null,
  cod_usuario = null,
  observaciones = null,
  fecha_reserva = null,
  cod_vent_horaria = null,
}) => ([
  cod_solicitud,
  cod_doctor,
  cod_usuario,
  observaciones,
  fecha_reserva,
  cod_vent_horaria,
]);

const updateAppointmentValues = ({
  cod_cita = null,
  cod_doctor = null,
  fecha_reserva = null,
  cod_vent_horaria = null,
  cod_usuario = null,
  observaciones = '',
}) => ([
  cod_cita,
  cod_doctor,
  parseDateToString(fecha_reserva),
  cod_vent_horaria,
  cod_usuario,
  observaciones,
]);

module.exports = {
  addAppointmentValues,
  updateAppointmentValues,
}
