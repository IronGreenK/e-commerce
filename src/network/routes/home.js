const { Router } = require('express')

const response = require('./response')
const HomeRouter = Router()

HomeRouter.route('/').get((req, res) => {
  response({
    error: false,
    message: 'Hello world E-commerce Final Project!',
    res,
    status: 200
  })
})

module.exports = HomeRouter
