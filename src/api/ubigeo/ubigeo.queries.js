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

module.exports = {
  getDepartamentos
}
