const { Router } = require('express')

const {
    genre: { storeGenreSchema }
} = require('../../schemas')
const { validatorCompiler } = require('./utils')
const response = require('./response')
const { GenreService } = require('../../services')

const GenreRouter = Router()



GenreRouter.route('/genre').post(
    validatorCompiler(storeGenreSchema, 'body'),
    async (req, res, next) => {
        const {
            body: { id, name }
        } = req

        try {
            const genreService = new GenreService({ id, name })

            response({
                error: false,
                message: await genreService.saveGenre(),
                res,
                status: 201
            })
        } catch (error) {
            next(error)
        }
    }
)

GenreRouter.route('/genre/:id').get(async (req, res, next) => {
    const {
        params: { id }
    } = req

    try {
        const gameService = new GenreService({ id })

        response({
            error: false,
            message: await gameService.getGenreByID(),
            res,
            status: 200
        })
    } catch (error) {
        next(error)
    }
})

module.exports = GenreRouter
