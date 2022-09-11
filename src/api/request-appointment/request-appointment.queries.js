const getAppointmentBy = (whereParams) =>
`
  SELECT 
    solicitud.cod_solicitud,
    solicitud.cod_usuario,
    solicitud.cod_estado,
    estados.descripcion,
    solicitud.cod_tipo_atencion,
    solicitud.cod_tipo_servicio,
    solicitud.cod_modalidad,
    pacientes.cod_plan,
    planes_salud.cod_iafa,
    
    solicitud.fecha_programacion,
    solicitud.hora_programacion,
    solicitud.sintomas,
    solicitud.diagnostico,
    pacientes.cod_paciente,
    
    usuarios.nombres,
    usuarios.ape_paterno,
    usuarios.ape_materno,
    usuarios.fec_nacimiento,
    usuarios.cod_tipo_doc,
    usuarios.num_documento,
    usuarios.departamento,
    usuarios.provincia,
    usuarios.distrito,
    usuarios.direccion,
    usuarios.email,
    usuarios.telefono1,
    usuarios.telefono2,

    citas.cod_cita,
    especialidad.cod_especialidad,
    disponibilidad.cod_vent_horaria,
    doctores.cod_doctor
  FROM 
    solicitud
  INNER JOIN
    pacientes ON pacientes.cod_paciente = solicitud.cod_paciente
  INNER JOIN 
    usuarios ON usuarios.cod_usuario = pacientes.cod_usuario
  INNER JOIN
    estados ON estados.cod_estado = solicitud.cod_estado
  LEFT JOIN 
    planes_salud ON planes_salud.cod_plan = pacientes.cod_plan
  INNER JOIN
  	citas ON citas.cod_solicitud = solicitud.cod_solicitud
  INNER JOIN
  	horarios_reserva ON horarios_reserva.cod_cita = citas.cod_cita
  INNER JOIN
    disponibilidad ON disponibilidad.cod_disponibilidad = horarios_reserva.cod_disponibilidad
  INNER JOIN 
  	doctores ON doctores.cod_doctor = citas.cod_doctor
  LEFT JOIN
    especialidad ON especialidad.cod_especialidad = doctores.cod_especialidad
  WHERE solicitud.cod_estado != 5 ${whereParams ? `AND ${whereParams}` : ''}
  ORDER BY
    solicitud.fec_actualizacion desc
`;

const insert = 
`
  INSERT INTO 
    solicitud(
      cod_solicitud, 
      cod_paciente, 
      cod_usuario, 
      cod_tipo_atencion, 
      cod_tipo_servicio, 
      cod_modalidad, 
      cod_estado, 
      sintomas, 
      diagnostico, 
      fecha_programacion, 
      hora_programacion, 
      fec_registro, 
      fec_actualizacion
    )
  VALUES(
    nextval('seq_cod_solicitud'), 
    $1, 
    $2, 
    $3, 
    $4, 
    $5, 
    2, 
    $6, 
    $7, 
    $8, 
    $9, 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
  ) RETURNING cod_solicitud
`;

const update = 
`
  UPDATE 
    solicitud
  SET 
    cod_tipo_atencion = $1, 
    cod_tipo_servicio = $2, 
    cod_modalidad = $3, 
    sintomas = $4, 
    diagnostico = $5, 
    fecha_programacion = $6, 
    hora_programacion = $7, 
    fec_actualizacion = $8,
    cod_estado = 2
  WHERE 
    cod_solicitud = $9
`;

const remove = 
`
  UPDATE 
    solicitud 
  SET 
    cod_estado = 5 
  WHERE 
    cod_solicitud = $1
`;

const assignTo = 
`
  UPDATE 
    solicitud 
  SET 
    cod_usuario = $1,
    fec_actualizacion = $2
  WHERE 
    cod_solicitud = $3
`;

module.exports = {
  getAppointmentBy,
  insert,
  update,
  remove,
  assignTo,
}
