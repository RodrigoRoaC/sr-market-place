const addDoctorValues = ({
  cod_usuario,
  cod_especialidad,
}) => ([
  cod_usuario,
  cod_especialidad,
]);

const updateDoctorValues = ({
  cod_doctor,
  cod_especialidad,
  flag_activo = '1',
  fec_actualizacion = new Date(),
}) => ([
  cod_especialidad,
  flag_activo,
  fec_actualizacion,
  cod_doctor,
]);

const addAvaValues = ({
  fec_ini,
  fec_fin,
  ven_hor,
  cod_doctor,
  cod_resp,
}) => ([
  cod_doctor,
  fec_ini,
  fec_fin,
  ven_hor,
  cod_resp,
])

module.exports = {
  addDoctorValues,
  updateDoctorValues,
  addAvaValues,
}
