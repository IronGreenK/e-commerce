const { Type } = require('@sinclair/typebox')

const storeGameSchema = Type.Object({
  name: Type.String({ minLength: 2 }),
  rating: Type.Number({ minimum: 1, maximum: 5 }),
  price: Type.Number({ minimum: 100 }),
  stock: Type.Number({ minimum: 1 })
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
