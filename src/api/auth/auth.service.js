const postgresql = require('../../database/postgresql');
const { parseDateToString } = require('../../utils/parser');

async function authenticate({ username, clave }) {
  const client = await postgresql.getConnectionClient();
  try {
    const userData = await client.query(
      'SELECT * FROM usuarios INNER JOIN perfiles ON perfiles.cod_perfil = usuarios.cod_perfil WHERE username = $1 and clave = $2', 
      [username, clave]
    );

    return { data: userData.rows[0] };
  } catch(err) {
    console.error('An error occurred while authenticating', err);

    return { error: true, details: err }
  } finally {
    client.release();
  }
}

async function authenticateUNR({ num_documento, fec_nacimiento }) {
  const client = await postgresql.getConnectionClient();
  try {
    const userData = await client.query(
      'SELECT * FROM usuarios INNER JOIN perfiles ON perfiles.cod_perfil = usuarios.cod_perfil WHERE num_documento = $1 and fec_nacimiento = $2', 
      [num_documento, parseDateToString(fec_nacimiento)]
    );

    return { data: userData.rows[0] };
  } catch(err) {
    console.error('An error occurred while authenticating', err);

    return { error: true, details: err }
  } finally {
    client.release();
  }
}

module.exports = {
  authenticate,
  authenticateUNR,
}
