const SearchLog = require('../../drivers/models/searchLog')
const SearchLogRepository = require('../repositories/SearchLogRepository')

module.exports = class extends SearchLogRepository {
  constructor() {
    super()
    this.model = SearchLog
  }

  async createLog(searchLogEntity) {
    const { endpoint, value } = searchLogEntity
    const searchLog = await this.model.create({ endpoint, value })
    await searchLog.save()

    return searchLog
  }
}
