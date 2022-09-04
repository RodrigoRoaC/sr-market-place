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

module.exports = {
  list,
}
