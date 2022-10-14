const httpErrors = require('http-errors')
const { nanoid } = require('nanoid')

const GenreService = require('./genre')
const {
  mongo: { queries }
} = require('../database')
const {
  game: {
    getGameByID,
    saveGame,
    getAllGames,
    removeGameByID,
    updateOneGame,
    getOneGame
  }
} = queries

class GameService {
  #gameId
  #name
  #rating
  #price
  #stock
  #genre

  /**
   * @param {Object} args
   * @param {String} args.gameId
   * @param {String} args.name
   * @param {Number} args.rating
   * @param {Number} args.price
   * @param {Number} args.stock
   * @param {String} args.genre
   */
  constructor(args = {}) {
    const {
      gameId = '',
      name = '',
      rating = '',
      price = '',
      stock = '',
      genre = '1'
    } = args

    this.#gameId = gameId
    this.#name = name
    this.#rating = rating
    this.#price = price
    this.#stock = stock
    this.#genre = genre
  }

  async verifyGameExists() {
    if (!this.#gameId)
      throw new httpErrors.BadRequest('Missing required field: gameId')

    const game = await getGameByID(this.#gameId)

    if (!game) throw new httpErrors.NotFound('Game not found')

    return game
  }

  async saveGame() {
    if (!this.#name)
      throw new httpErrors.BadRequest('Missing required field: name')

    if (!this.#rating)
      throw new httpErrors.BadRequest('Missing required field: rating')

    if (!this.#price)
      throw new httpErrors.BadRequest('Missing required field: price')

    if (!this.#stock)
      throw new httpErrors.BadRequest('Missing required field: stock')

    if (!this.#genre)
      throw new httpErrors.BadRequest('Missing required field: genre')

    const genre = await new GenreService({ id: this.#genre }).getGenreByID()

    await saveGame({
      id: nanoid(),
      name: this.#name,
      rating: this.#rating,
      price: this.#price,
      stock: this.#stock,
      genre: genre._id
    })

    return await getAllGames()
  }

  async getGameByID() {
    if (!this.#gameId)
      throw new httpErrors.BadRequest('Missing required field: gameId')

    const game = await getGameByID(this.#gameId)

    if (!game)
      throw new httpErrors.NotFound('The requested game does not exists')

    return game
  }

  async getAllGames() {
    return await getAllGames()
  }

  async removeGameByID() {
    if (!this.#gameId)
      throw new httpErrors.BadRequest('Missing required field: gameId')

    const game = await removeGameByID(this.#gameId)

    if (!game)
      throw new httpErrors.NotFound('The requested game does not exists')

    return game
  }

  async updateOneGame() {
    if (!this.#gameId)
      throw new httpErrors.BadRequest('Missing required field: gameId')

    return await updateOneGame({
      id: this.#gameId,
      name: this.#name,
      rating: this.#rating,
      price: this.#price,
      stock: this.#stock,
      genre: this.#genre
    })
  }

  async getOneGame() {
    if (!this.#name)
      throw new httpErrors.BadRequest('Missing required field: name')

    const game = await getOneGame({ name: this.#name })

    if (!game) throw new httpErrors.BadRequest('Not exist game')

    return game
  }
}

module.exports = GameService
