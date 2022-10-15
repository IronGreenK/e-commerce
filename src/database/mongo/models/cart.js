const { model, Schema } = require('mongoose')

const ShoppingCartSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: Boolean,
      required: true
    },
    voucher: {
      type: String,
      required: true,
      enum: ['bill', 'ticket'],
      default: 'ticket'
    },
    total: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

const CartModel = model('shoppingCart', ShoppingCartSchema)

module.exports = CartModel
