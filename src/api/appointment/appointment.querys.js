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
    solicitud.fecha_autorizacion,
    solicitud.hora_programacion,
    solicitud.sintomas,
    solicitud.diagnostico,
    pacientes.cod_paciente,
    
    usuarios.nombres,
    usuarios.ape_paterno,
    usuarios.ape_materno,
    usuarios.cod_tipo_doc,
    usuarios.num_documento,
    usuarios.departamento,
    usuarios.provincia,
    usuarios.distrito,
    usuarios.direccion,
    usuarios.email,
    usuarios.telefono1
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
  WHERE solicitud.cod_estado != 5 ${whereParams ? `AND ${whereParams}` : ''}
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
      fecha_autorizacion, 
      numero_autorizacion, 
      fec_registro, 
      fec_actualizacion
    )
  VALUES(nextval('seq_cod_solicitud'), $1, $2, $3, $4, $5, 2, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING cod_solicitud
`;

module.exports = {
  getAppointmentBy,
  insert,
}
