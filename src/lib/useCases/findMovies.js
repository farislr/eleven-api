module.exports = (string, options, { movieRepository }) => {
  return movieRepository.find(string, options)
}
