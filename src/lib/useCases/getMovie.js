module.exports = (id, { movieRepository }) => {
  return movieRepository.getById(id)
}
