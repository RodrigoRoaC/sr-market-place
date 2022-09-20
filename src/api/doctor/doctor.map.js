const addDoctorValues = ({
  cod_usuario,
  cod_especialidad,
  cod_tipo_atencion,
}) => ([
  cod_usuario,
  cod_especialidad,
  cod_tipo_atencion,
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

const getVenHorariaValues = ({
  cod_doctor,
  fecha_reserva
}) => ([
  +cod_doctor,
  fecha_reserva,
]);

const parseDoctor = (doctores = []) => doctores.map(doc => ({ ...doc, nombres_doctor: `${doc.nombres} ${doc.ape_paterno}` }));

module.exports = {
  addDoctorValues,
  updateDoctorValues,
  addAvaValues,
  getVenHorariaValues,
  parseDoctor,
}
