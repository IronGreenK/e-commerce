const { Type } = require('@sinclair/typebox')

const storeGenreSchema = Type.Object({
    name: Type.String({ minLength: 3 }),
    id: Type.Integer()
})

module.exports = {
    storeGenreSchema
}
