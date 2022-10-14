const {Router} = require('express')

const {
    game: {storeGameSchema, updateGameSchema, gameIDSchema},
    role: {typeRoleSchema}
} = require('../../schemas')
const {auth, validatorCompiler} = require('./utils')
const response = require('./response')
const {GameService} = require('../../services')

const GameRouter = Router()

GameRouter.route('/game').get(auth.verifyUser(), async (req, res, next) => {
    try {
        const gameService = new GameService()

        response({
            error: false,
            message: await gameService.getAllGames(),
            res,
            status: 200
        })
    } catch (error) {
        next(error)
    }
})

GameRouter.route('/game/save')
    .post(
        validatorCompiler(storeGameSchema, 'body'),
        auth.verifyUser(),
        async (req, res, next) => {
            try {
                const {
                    body: {name, rating, price, stock}
                } = req

                response({
                    error: false,
                    message: await new GameService({
                        name,
                        rating,
                        price,
                        stock,
                    }).saveGame(),
                    res,
                    status: 201
                })
            } catch (error) {
                next(error)
            }
        }
    )


GameRouter.route('/game/:id')
    .get(
        validatorCompiler(gameIDSchema, 'params'),
        auth.verifyUser(),
        async (req, res, next) => {
            try {
                const {
                    params: {id: gameId}
                } = req
                const gameService = new GameService({gameId})

                response({
                    error: false,
                    message: await gameService.getGameByID(),
                    res,
                    status: 200
                })
            } catch (error) {
                next(error)
            }
        }
    )
    .delete(
        validatorCompiler(gameIDSchema, 'params'),
        auth.verifyUser(),
        async (req, res, next) => {
            try {
                const {
                    params: {id}
                } = req
                const gameService = new GameService({gameId: id})

                response({
                    error: false,
                    message: await gameService.removeGameByID(),
                    res,
                    status: 200
                })
            } catch (error) {
                next(error)
            }
        }
    )
    .patch(
        validatorCompiler(gameIDSchema, 'params'),
        validatorCompiler(updateGameSchema, 'body'),
        auth.verifyUser(),
        async (req, res, next) => {
            const {
                body: {name, rating, price, stock},
                params: {id: gameId}
            } = req

            try {
                response({
                    error: false,
                    message: await new GameService({
                        gameId,
                        name,
                        rating,
                        price,
                        stock,
                    }).updateOneGame(),
                    res,
                    status: 200
                })
            } catch (error) {
                next(error)
            }
        }
    )


module.exports = GameRouter
