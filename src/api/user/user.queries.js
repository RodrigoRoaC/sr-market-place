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
    departamento = $3, 
    provincia = $4, 
    distrito = $5, 
    email = $6, 
    direccion = $7, 
    telefono1 = $8 
  WHERE 
    cod_usuario = $9
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
      departamento, 
      provincia, 
      distrito, 
      email, 
      direccion, 
      telefono1, 
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
    7, 
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
`

const getPatientBy = (whereParams) =>
`
  SELECT 
    * 
  FROM 
    pacientes 
  WHERE 
    ${whereParams}
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

module.exports = {
  getClientIdBy,
  update,
  register,
  registerPatient,
  getPatientBy,
  updatePatientPlan,
}
