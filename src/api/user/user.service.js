const postgresql = require('../../database/postgresql');
const Utils = require('../../utils/parser');
const UserQueries = require('../user/user.queries');

async function getOperators() {
  const client = await postgresql.getConnectionClient();
  try {
    const operatorsRes = await client.query(UserQueries.getOperators);

    return { data: Utils.toComboData(operatorsRes.rows, 'cod_usuario', 'nombres') };
  } catch(err) {

    return { error: true, details: err };
  } finally {
    client.release();
  }
}

module.exports = {
  getOperators,
}
