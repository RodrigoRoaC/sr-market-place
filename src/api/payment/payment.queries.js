const getPaymentsBy = ({ whereParams }) => 
`
  SELECT
    pagos.*,
    estados.descripcion,
    pacientes.cod_paciente,
    usuarios.nombres,
    usuarios.ape_paterno,
    usuarios.ape_materno,
    usuarios.num_documento,
    usuarios.email,
    tipo_documento.desc_corta
  FROM
    pagos
  INNER JOIN
    estados ON estados.cod_estado = pagos.cod_estado
  INNER JOIN
    solicitud ON solicitud.cod_solicitud = pagos.cod_solicitud
  INNER JOIN
    pacientes ON pacientes.cod_paciente = solicitud.cod_paciente
  INNER JOIN 
    usuarios ON usuarios.cod_usuario = pacientes.cod_usuario
  INNER JOIN 
    tipo_documento ON tipo_documento.cod_tipo_doc = usuarios.cod_tipo_doc
  WHERE
    ${whereParams}
  ORDER BY
    pagos.fec_actualizacion desc
`;

const updateLink = 
`
  UPDATE 
    pagos
  SET
    link_pago = $1
  WHERE 
    cod_pago = $2
`;

const remove = 
`
  UPDATE 
    pagos
  SET
    cod_estado = 5,
    fecha_cancelacion = $1
  WHERE 
    cod_pago = $2
`;

const insert = 
`
  INSERT INTO 
    pagos(
      cod_pago, 
      cod_solicitud, 
      cod_estado, 
      link_pago, 
      deducible, 
      copago, 
      numero_boleta, 
      numero_autorizacion,
      fecha_autorizacion, 
      observaciones, 
      fec_registro, 
      fec_actualizacion
    )
  VALUES
    (
      nextval('seq_cod_pago'), 
      $1, 
      $2, 
      $3, 
      $4, 
      $5, 
      $6, 
      $7,
      $8, 
      $9, 
      CURRENT_TIMESTAMP, 
      CURRENT_TIMESTAMP
    );
`;

const update = 
`
  UPDATE
    pagos
  SET
    link_pago = $1,
    deducible = $2,
    copago = $3,
    numero_boleta = $4,
    numero_autorizacion = $5,
    fecha_autorizacion = $6,
    observaciones = $7,
    fec_actualizacion = $8
  WHERE
    cod_pago = $9
`;

module.exports = {
  getPaymentsBy,
  updateLink,
  remove,
  insert,
  update,
}
