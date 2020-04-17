const express = require('express')
const { findMovies, getMovie } = require('../controllers/moviesController')

const router = express.Router()

router.get('/search', async (req, res) => {
  const { s, page } = req.query

  return res.json(await findMovies(s, { page }))
})

router.get('/detail/:id', async (req, res) => {
  const { id } = req.params

  res.json(await getMovie(id))
})

module.exports = router
