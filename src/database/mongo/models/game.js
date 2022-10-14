const {model, Schema} = require('mongoose')

const GameSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        genre: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'genres'
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toObject: {
            transform: (_, ret) => {
                delete ret._id
            }
        },
    }
)

const GameModel = model('games', GameSchema)

module.exports = GameModel