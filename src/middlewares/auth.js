module.exports = function (req, res, next) {
  if (req.query.apiKey === process.env.API_KEY) return next()

  return res.status(401).json({ message: 'Unauthorize' })
}
