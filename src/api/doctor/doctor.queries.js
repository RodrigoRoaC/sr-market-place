const list = (whereParams) =>
`
  SELECT 
    doctores.cod_doctor,
    usuarios.cod_usuario,
    usuarios.username,
    usuarios.nombres,
    usuarios.ape_paterno,
    usuarios.ape_materno,
    usuarios.cod_perfil,
    usuarios.cod_tipo_doc,
    usuarios.num_documento,
    doctores.cod_especialidad,
    especialidad.descripcion AS "especialidad",
    doctores.flag_activo
  FROM 
    doctores
  INNER JOIN 
    usuarios ON usuarios.cod_usuario = doctores.cod_usuario
  INNER JOIN
    especialidad ON especialidad.cod_especialidad = doctores.cod_especialidad
  ${whereParams ? `WHERE ${whereParams}` : ''}
  ORDER BY
    doctores.fec_actualizacion desc
`;

const getEspecialidades = `SELECT * FROM especialidad`;

const getVentanaHoraria = 
`
  SELECT 
    cod_vent_horaria,
    hora_inicio || ' - ' || hora_fin as "horario"
  FROM 
    ventana_horaria;
`;

const register = 
`
  INSERT INTO 
    doctores(
      cod_doctor,
      cod_usuario,
      cod_especialidad,
      flag_activo,
      fec_registro,
      fec_actualizacion
    )
  VALUES
    (
      nextval('seq_cod_doctor'),
      $1,
      $2,
      '1',
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    ) RETURNING cod_doctor
`;

const update = 
`
  UPDATE
    doctores
  SET
    cod_especialidad = $1,
    flag_activo = $2,
    fec_actualizacion = $3
  WHERE
    cod_doctor = $4
`;

const registerAvailability = 
`
  SELECT
    public.sp_getcapacitybetweendates($1, $2::date, $3::date, $4, $5);
`

const getVentanaHorariaByDate = 
`
  SELECT 
    ventana_horaria.cod_vent_horaria,
    ventana_horaria.hora_inicio || ' - ' || ventana_horaria.hora_fin as "horario",
    disponibilidad.flag_disponible
  FROM 
    disponibilidad
  INNER JOIN 
    ventana_horaria ON ventana_horaria.cod_vent_horaria = disponibilidad.cod_vent_horaria
  WHERE 
    cod_doctor = $1 AND flag_disponible = '1' AND fecha_reserva = $2;
`;

const deleteAvailabilityByDate = 
`
  DELETE FROM disponibilidad WHERE cod_doctor = $1 AND fecha_reserva = $2;
`;

module.exports = {
  list,
  getVentanaHoraria,
  getEspecialidades,
  register,
  update,
  registerAvailability,
  getVentanaHorariaByDate,
  deleteAvailabilityByDate,
}
