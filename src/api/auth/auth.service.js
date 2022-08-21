const postgresql = require('../../database/postgresql');

async function authenticate({ username, clave }) {
  const client = await postgresql.getConnectionClient();
  try {
    const userData = await client.query(
      'SELECT * FROM usuarios WHERE username = $1 and clave = $2', 
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

module.exports = {
  authenticate,
}
