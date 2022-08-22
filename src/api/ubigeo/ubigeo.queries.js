const getDepartamentos = 
`
  SELECT 
    departamento, 
    descripcion 
  FROM 
    ubigeo 
  WHERE 
    distrito = '00' and provincia = '00' 
  ORDER BY 
    descripcion asc
`;

const getProvincias = 
`
  SELECT
    provincia,
    descripcion
  FROM 
    ubigeo
  WHERE
    ubigeo.departamento = $1 and ubigeo.distrito = '00' and ubigeo.provincia <> '00' 
  ORDER BY
    descripcion asc
`;

const getDistritos = 
`
  SELECT
    distrito,
    descripcion
  FROM 
    ubigeo
  WHERE
    ubigeo.departamento = $1 and ubigeo.provincia = $2 and ubigeo.distrito <> '00' 
  ORDER BY
    descripcion asc
`;

module.exports = {
  getDepartamentos,
  getProvincias,
  getDistritos,
}
