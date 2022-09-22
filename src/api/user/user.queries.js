const getClientIdBy = (whereParams) => 
`
  SELECT 
    * 
  FROM 
    usuarios 
  INNER JOIN 
    pacientes 
    ON pacientes.cod_usuario = usuarios.cod_usuario 
  WHERE 
    ${whereParams}
`;

const update = 
`
  UPDATE 
    usuarios 
  SET 
    nombres = $1, 
    ape_paterno = $2, 
    ape_materno = $3, 
    fec_nacimiento = $4, 
    departamento = $5, 
    provincia = $6, 
    distrito = $7, 
    email = $8, 
    direccion = $9, 
    telefono1 = $10, 
    telefono2 = $11,
    username = $12, 
    fec_actualizacion = CURRENT_TIMESTAMP
  WHERE 
    cod_usuario = $13
`;

const register = 
`
  INSERT INTO 
    usuarios(
      cod_usuario, 
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
      username,
      cod_perfil, 
      fec_registro, 
      fec_actualizacion
    ) 
  VALUES(
    nextval('seq_cod_usuario'), 
    $1, 
    $2, 
    $3, 
    $4, 
    $5, 
    $6, 
    $7, 
    $8, 
    $9, 
    $10, 
    $11, 
    $12, 
    $13, 
    $14,
    $15, 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
  ) 
  RETURNING cod_usuario
`;

const registerPatient = 
`
  INSERT INTO 
    pacientes(
      cod_paciente, 
      cod_usuario, 
      cod_plan, 
      fec_registro, 
      fec_actualizacion
    )
  VALUES(
    nextval('seq_cod_paciente'), 
    $1, 
    $2, 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
    ) 
  RETURNING cod_paciente        
`;

const getPatientBy = (whereParams) =>
`
  SELECT 
    * 
  FROM 
    pacientes 
  INNER JOIN
    usuarios ON usuarios.cod_usuario = pacientes.cod_usuario 
  ${whereParams ? `WHERE ${whereParams}` : ''}
`;

const updatePatientPlan = 
`
  UPDATE 
    pacientes 
  SET 
    cod_plan = $1, 
    fec_actualizacion = $2 
  WHERE 
    pacientes.cod_paciente = $3
`;

const getOperators =
`
  SELECT
    cod_usuario, 
    concat(nombres, ' ', ape_paterno) AS nombres
  FROM 
    usuarios
  WHERE
    usuarios.cod_perfil = 3
`;

const updateUserPayment = 
`
  UPDATE
    usuarios
  SET
    nombres = $1,
    ape_paterno = $2,
    ape_materno = $3,
    email = $4
  WHERE
    cod_usuario = $5
`;

module.exports = {
  getClientIdBy,
  update,
  register,
  registerPatient,
  getPatientBy,
  updatePatientPlan,
  getOperators,
  updateUserPayment,
}
