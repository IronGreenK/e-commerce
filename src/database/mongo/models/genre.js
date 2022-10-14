const {model, Schema} = require('mongoose')
const {
    genre: {GENRE_NAMES}
} = require('../../../utils')

const GenreSchema = new Schema(
    {
        id: {
            required: true,
            type: String,
            unique: true
        },
        name: {
            required: true,
            type: String,
            enum: GENRE_NAMES
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toObject: {
            transform: (_, ret) => {
                delete ret._id
            }
        }
    }
)

const GenreModel = model('genres', GenreSchema)

module.exports = GenreModel
