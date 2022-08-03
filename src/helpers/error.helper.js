const catchError = (ftn) => (req, res, next) => ftn(req, res).catch((err) => {
  next(err);
});

module.exports = {
  catchError,
}
