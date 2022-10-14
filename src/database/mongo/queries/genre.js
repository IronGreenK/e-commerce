const { GenreModel } = require('../models')

/**
 * It takes a genre object, creates a new GenreModel instance, saves it, and returns
 * the saved genre
 * @param {Object} genre
 * @param {String} genre.id
 * @param {String} genre.name
 * @returns The savedGenre is being returned.
 */
const saveGenre = async genre => {
    const savedRole = new GenreModel(genre)

    await savedRole.save()

    return savedRole
}

/**
 * Get a role by its ID.
 * @param {String} id
 * @returns The first genre in the array of genres.
 */
const getGenreByID = async id => {
    const genres = await GenreModel.find({ id })

    return genres[0]
}

/**
 * Get the role by name.
 * @param {String} name
 * @returns The first genre in the array of genres.
 */
const getGenreByName = async name => {
    const genres = await GenreModel.find({ name })

    return genres[0]
}

module.exports = {
    saveGenre,
    getGenreByID,
    getGenreByName
}
