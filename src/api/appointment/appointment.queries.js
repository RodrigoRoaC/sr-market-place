const register = 
`
  INSERT INTO 
    citas(
      cod_cita,
      cod_solicitud,
      cod_doctor,
      cod_usuario,
      cod_estado,
      observaciones,
      fecha_cancelacion,
      fec_registro, 
      fec_actualizacion
    )
  VALUES
    (
      nextval('seq_cod_cita'), 
      $1, 
      $2, 
      $3, 
      $4, 
      $5, 
      NULL, 
      CURRENT_TIMESTAMP, 
      CURRENT_TIMESTAMP
    )
  RETURNING cod_cita;
`;

const getAppointments = (whereParams, orderBy) => 
`
  SELECT
    c.cod_cita,
    s.sintomas,
    s.diagnostico,
    s.fecha_programacion,
    c.observaciones,
    c.cod_estado,
    c.cod_doctor,
    u1.nombres || ' ' || u1.ape_paterno as nombres_doctor,
    e.descripcion as especialidad,
    ta.descripcion as tipo_atencion,
    s.cod_paciente,
    u2.nombres || ' ' || u2.ape_paterno as nombres_paciente,
    u2.telefono1,
    u2.email,
    td.desc_corta as tipo_documento,
    u2.num_documento,
    hr.cod_disponibilidad,
    ds.flag_disponible,
    vh.hora_inicio || ' - ' || vh.hora_fin as horario
  FROM 
    citas c
  INNER JOIN 
    solicitud s ON s.cod_solicitud = c.cod_solicitud
  INNER JOIN 
    doctores d ON d.cod_doctor = c.cod_doctor
  INNER JOIN 
    usuarios u1 ON u1.cod_usuario = d.cod_usuario
  LEFT JOIN 
    especialidad e ON e.cod_especialidad = d.cod_especialidad
  LEFT JOIN 
    tipo_atencion ta ON ta.cod_tipo_atencion = d.cod_tipo_atencion
  INNER JOIN 
    pacientes p ON p.cod_paciente = s.cod_paciente
  INNER JOIN 
    usuarios u2 ON u2.cod_usuario = p.cod_usuario
  LEFT JOIN 
    tipo_documento td ON td.cod_tipo_doc = u2.cod_tipo_doc
  INNER JOIN 
    horarios_reserva hr ON hr.cod_cita = c.cod_cita
  INNER JOIN 
    disponibilidad ds ON ds.cod_disponibilidad = hr.cod_disponibilidad
  INNER JOIN 
    ventana_horaria vh ON vh.cod_vent_horaria = ds.cod_vent_horaria
  WHERE 
    c.cod_estado <> 5 ${whereParams ? `AND ${whereParams}` : ''} 
  ${orderBy ? `ORDER BY ${orderBy}` : ''}
`;

module.exports = {
  register,
  getAppointments,
}
