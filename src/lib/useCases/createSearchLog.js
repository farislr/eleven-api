const SearchLog = require('../entities/SearchLog')

module.exports = (endpoint, value, { searchLogRepository }) => {
  const searchLog = new SearchLog(null, endpoint, value)

  return searchLogRepository.createLog(searchLog)
}
