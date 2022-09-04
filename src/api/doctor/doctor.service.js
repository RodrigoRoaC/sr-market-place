const postgresql = require('../../database/postgresql');
const DoctorQueries = require('./doctor.queries');

async function list() {
  const client = await postgresql.getConnectionClient();
  try {
    const appointments = await client.query(DoctorQueries.list());

    return { data: appointments.rows };
  } catch(err) {
    console.error('An error occurred while fetching', err);

    return { error: true, details: err };
  } finally {
    client.release();
  }
}


module.exports = {
  list,
}
