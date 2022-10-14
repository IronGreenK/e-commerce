const { Type } = require('@sinclair/typebox')

const storeGameSchema = Type.Object({
    name: Type.String({ minLength: 2 }),
    rating: Type.Number({ minLength: 1, maxLength: 1 }),
    price: Type.Number({ minLength: 1}),
    stock: Type.Number({ minLength: 1}),
})

const updateGameSchema = Type.Partial(storeGameSchema)

const gameIDSchema = Type.Object({
    id: Type.String({ minLength: 21, maxLength: 21 })
})

module.exports = {
    storeGameSchema,
    updateGameSchema,
    gameIDSchema
}
