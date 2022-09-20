const mapRegisterValues = ({
  cod_paciente,
  fec_atencion,
  cod_mae_indicator,
  valor,
  observaciones,
}) => ([
  cod_paciente,
  fec_atencion,
  cod_mae_indicator,
  valor,
  observaciones,
]);

const mapRegisterMaeValues = ({
  descripcion,
  rango_minimo,
  rango_maximo,
}) => ([
  descripcion,
  rango_minimo,
  rango_maximo,
]);

const mapUpdateMaeValues = ({
  descripcion,
  rango_minimo,
  rango_maximo,
  cod_mae_indicator,
}) => ([
  descripcion,
  rango_minimo,
  rango_maximo,
  new Date(),
  cod_mae_indicator,
]);

const mapUpdateValues = ({
  cod_paciente,
  fec_atencion,
  cod_mae_indicator,
  valor,
  observaciones,
  cod_indicator,
}) => ([
  cod_paciente,
  fec_atencion,
  cod_mae_indicator,
  valor,
  observaciones,
  new Date(),
  cod_indicator,
]);

module.exports = {
  mapRegisterValues,
  mapUpdateValues,
  mapRegisterMaeValues,
  mapUpdateMaeValues,
}
