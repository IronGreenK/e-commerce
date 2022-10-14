const { UserService } = require('../../src/services')

const users = []
const roles = [
  {
    _id: '1234',
    id: '1',
    name: 'vendor',
    description: 'system vendor'
  },
  {
    _id: '1235',
    id: '2',
    name: 'user',
    description: 'user who can sell and buy articles'
  }
]

const genres = [
  {
    _id: '5432',
    id: '1',
    name: 'simulation',
    description: 'game attempts to copy various activities from real life'
  },{
  _id: '5433',
    id: '2',
    name:'action',
    description: 'genre that emphasizes physical challenges'
  }
]

const games = []

jest.mock('../../src/database/mongo/queries', () => {
  return {
    user: {
      saveUser: jest.fn(async user => users.push(user)),
      getUserByID: jest.fn(async id => users.filter(user => user.id === id)),
      getAllUsers: jest.fn(async () => users),
      removeUserByID: jest.fn(async id => {
        const index = users.findIndex(user => user.id === id)

        if (index === -1) throw new Error('User not found')

        const userToBeDeleted = users[index]

        users.splice(index, 1)

        return userToBeDeleted
      }),
      updateOneUser: jest.fn(async user => {
        const { id, name, lastName, email, salt, hash } = user
        const index = users.findIndex(u => u.id === id)

        if (index === -1) throw new Error('User not found')

        const userUpdated = {
          ...users[index],
          ...(name && { name }),
          ...(lastName && { lastName }),
          ...(email && { email }),
          ...(salt &&
            hash && {
              salt,
              hash
            })
        }

        users.splice(index, 1, userUpdated)

        return userUpdated
      }),
      getOneUser: jest.fn(async query => {
        const { id, name, lastName, email, salt, hash } = query

        return users.find(user => {
          let aux = true

          id && (aux = aux && user.id === id)
          aux && name && (aux = aux && user.name === name)
          aux && lastName && (aux = aux && user.lastName === lastName)
          aux && email && (aux = aux && user.email === email)
          aux && salt && (aux = aux && user.salt === salt)
          aux && hash && (aux = aux && user.hash === hash)

          return aux
        })[0]
      })
    },
    game: {
      saveGame: jest.fn(async game => games.push(game)),
      getGameByID: jest.fn(async id => games.filter(game => game.id === id)),
      getAllGames: jest.fn(async () => games),
      removeGameByID: jest.fn(async id => {
        const index = games.findIndex(game => game.id === id)

        if (index === -1) throw new Error('Game not found')

        const gameToBeDeleted = games[index]

        games.splice(index, 1)

        return gameToBeDeleted
      }),
      updateOneGame: jest.fn(async game => {
        const { id, name, rating, price, stock } = game
        const index = games.findIndex(g => g.id === id)

        if (index === -1) throw new Error('Game not found')

        const gameUpdated = {
          ...games[index],
          ...(name && { name }),
          ...(rating && { rating }),
          ...(price && { price }),
          ...(stock && { stock }),
        }

        games.splice(index, 1, gameUpdated)

        return gameUpdated
      }),
      getOneGame: jest.fn(async query => {
        const { id, name, rating, price, stock } = query

        return games.find(game => {
          let aux = true

          id && (aux = aux && game.id === id)
          aux && name && (aux = aux && game.name === name)
          aux && rating && (aux = aux && game.rating === rating)
          aux && price && (aux = aux && game.price === price)
          aux && stock && (aux = aux && game.stock === stock)

          return aux
        })[0]
      })
    },
    role: {
      saveRole: jest.fn(async role => roles.push(role)),
      getRoleByID: jest.fn(async id => roles.filter(role => role.id === id)[0]),
      getRoleByName: jest.fn(
        async name => roles.filter(role => role.name === name)[0]
      )
    },
    genre: {
      saveGenre: jest.fn(async genre => genres.push(genre)),
      getGenreByID: jest.fn(async id => genres.filter(genre => genre.id === id)[0]),
      getGenreByName: jest.fn(
          async name => genres.filter(genre => genre.name === name)[0]
      )
    }
  }
})

describe('Unit test: Use cases from UserService', () => {
  test('Add a user', async () => {
    const user = {
      name: 'Kevin',
      lastName: 'Araneda',
      email: 'ke.araneda@gmail.com',
      userName: 'kearaneda',
      password: '123'
    }

    await new UserService(user).saveUser()
    expect(users.length).toBe(1)
  })

  test('Get all users', async () => {
    const allUsers = await new UserService().getAllUsers()

    expect(allUsers.length).toBe(users.length)
  })
})
