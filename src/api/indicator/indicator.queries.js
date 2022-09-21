const getBy = ({ whereParams }) => 
`
  SELECT
    indicadores.*,
    mae_indicador.descripcion as nombre_mae_indicator,
    mae_indicador.rango_minimo,
    mae_indicador.rango_maximo,
    pacientes.cod_paciente,
    usuarios.num_documento,
    usuarios.nombres || ' ' || usuarios.ape_paterno as nombres_paciente
  FROM
    indicadores
  INNER JOIN
    mae_indicador ON indicadores.cod_mae_indicator = mae_indicador.cod_mae_indicator
  INNER JOIN 
    pacientes ON pacientes.cod_paciente = indicadores.cod_paciente
  INNER JOIN
    usuarios ON usuarios.cod_usuario = pacientes.cod_usuario
  ${whereParams ? `WHERE ${whereParams}` : ''}
  ORDER BY
    indicadores.fec_actualizacion desc
`;

const getMaeBy = ({ whereParams }) => 
`
  SELECT
    *
  FROM
    mae_indicador
  ${whereParams ? `WHERE ${whereParams}` : ''}
  ORDER BY
    mae_indicador.fec_actualizacion desc
`;

const register = 
`
  INSERT INTO 
    indicadores(
      cod_indicator,
      cod_paciente,
      fec_atencion,
      cod_mae_indicator,
      valor,
      observaciones,
      fec_registro,
      fec_actualizacion
    )
  VALUES
    (
      nextval('seq_cod_indicadores'),
      $1,
      TO_DATE($2,'DD/MM/YYYY'),
      $3,
      $4,
      $5,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
  RETURNING cod_indicator
`;

const registerMae = 
`
  INSERT INTO 
    mae_indicador(
      cod_mae_indicator,
      descripcion,
      rango_minimo,
      rango_maximo,
      fec_registro,
      fec_actualizacion
    )
  VALUES
    (
      nextval('seq_cod_mae_indicador'),
      $1,
      $2,
      $3,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
  RETURNING cod_mae_indicator
`;

const updateMae = 
`
  UPDATE
    mae_indicador
  SET
    descripcion = $1,
    rango_minimo = $2,
    rango_maximo = $3,
    fec_actualizacion = $4
  WHERE
    cod_mae_indicator = $5
`;

const update = 
`
  UPDATE
    indicadores
  SET
    cod_paciente = $1,
    fec_atencion = $2,
    cod_mae_indicator = $3,
    valor = $4,
    observaciones = $5,
    fec_actualizacion = $6
  WHERE
    cod_indicator = $7
`;

const remove = 
`
  DELETE FROM
    indicadores
  WHERE
    cod_indicator = $1
`

module.exports = {
  getBy,
  register,
  update,
  remove,
  getMaeBy,
  registerMae,
  updateMae,
}
