const { Type } = require('@sinclair/typebox')

const storeRoleSchema = Type.Object({
  name: Type.String({ minLength: 2 }),
  id: Type.Integer()
})

const typeRoleSchema = Type.Object({
  id: Type.String()
})

module.exports = {
  storeRoleSchema,
  typeRoleSchema
}
