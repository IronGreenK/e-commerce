const httpErrors = require('http-errors')

const {
  mongo: { queries }
} = require('../database')
const {
  genre: { GENRE_IDS, GENRE_NAMES }
} = require('../utils')
const {
  genre: { saveGenre, getGenreByID, getGenreByName }
} = queries

class GenreService {
  #id
  #name

  /**
   * @param {Object} args
   * @param {String} args.id
   * @param {String} args.name
   */
  constructor(args = {}) {
    const { id, name = '' } = args

    if (!GENRE_IDS.includes(`${id}`))
      throw new httpErrors.BadRequest('GENRE ID not allowed')

    this.#id = id
    this.#name = name
  }

  async saveGenre() {
    if (!GENRE_NAMES.includes(this.#name))
      throw new httpErrors.BadRequest('Genre name not allowed')

    const gameExists = await getGenreByName(this.#name)

    if (gameExists) throw new httpErrors.Conflict('Genre already exists')

    return await saveGenre({ id: this.#id, name: this.#name })
  }

  async getGenreByID() {
    return await getGenreByID(this.#id)
  }
}

module.exports = GenreService
