const addAppointmentValues = ({
  cod_solicitud = null,
  cod_doctor = null,
  cod_usuario = null,
  cod_estado = null,
  observaciones = null,
}) => ([
  cod_solicitud,
  cod_doctor,
  cod_usuario,
  cod_estado,
  observaciones,
]);

module.exports = {
  addAppointmentValues,
}
