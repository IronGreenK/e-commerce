const {GameModel} = require('../models')

/**
 * It saves a game to the database
 * @param {Object} game
 * @param {String} game.id
 * @param {String} game.name
 * @param {Number} game.rating
 * @param {Number} game.price
 * @param {Number} game.stock
 * @param {import('mongoose').Schema.Types.ObjectId} game.genre
 * @returns A promise that resolves to the saved game
 */
const saveGame = async game => {
    const savedGame = new GameModel(game)

    await savedGame.save()

    return savedGame
}

/**
 * @param {String} id
 * @returns found game
 */
const getGameByID = async id => {
    const games = await GameModel.find({id})

    return games[0]
}

/**
 * @returns found games
 */
const getAllGames = async () => {
    const games = await GameModel.find()

    return games
}

/**
 * @param {String} id
 * @returns found game
 */
const removeGameByID = async id => {
    const game = await GameModel.findOneAndRemove({id})

    return game
}

/**
 * @param {Object} game
 * @param {String} game.id
 * @param {String|undefined} game.name
 * @param {Number|undefined} game.rating
 * @param {Number|undefined} game.price
 * @param {Number|undefined} game.stock
 * @returns updated game
 */
const updateOneGame = async game => {
    const {id, name, rating, price, stock} = game
    const gameUpdated = await GameModel.findOneAndUpdate(
        {id},
        {
            ...(name && {name}),
            ...(rating && {rating}),
            ...(price && {price}),
            ...(stock && {stock}),
        },
        {new: true}
    )

    return gameUpdated
}

/**
 * It returns the first game in the database that matches the query
 * @param {Object} query - The query object that will be used to find the game.
 * @returns The game user in the database
 */
const getOneGame = async (query = {}) => {
    const games = await GameModel.find(query)

    return games[0]
}

module.exports = {
    saveGame,
    getGameByID,
    getAllGames,
    removeGameByID,
    updateOneGame,
    getOneGame
}
