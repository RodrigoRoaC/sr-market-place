function Ok(res, data) {
  return res.status(200).send(data);
}

function BadRequest(res, data = { message: 'Bad Request' }) {
  return res.status(400).send(data);
}

function BDError(res, data = { message: 'BD Error' }) {
  return res.status(500).send(data);
}

function NotFound(res, data = { message: 'Not found' }) {
  return res.status(404).send(data);
}

module.exports = {
  Ok,
  BadRequest,
  BDError,
  NotFound,
}
