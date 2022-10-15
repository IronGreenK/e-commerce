const GENRES = {
  1: {
    name: 'simulation',
    description: 'game attempts to copy various activities from real life'
  },
  2: {
    name: 'action',
    description: 'genre that emphasizes physical challenges'
  },
  3: {
    name: 'adventure',
    description: 'games focus on puzzle solving within a narrative framework'
  },
  4: {
    name: 'role',
    description:
      'a game in which each participant assumes the role of a character'
  },
  5: {
    name: 'jigsow',
    description: 'game focus on pieces for complete a picture or photo'
  }
}

const GENRE_IDS = Object.keys(GENRES)

const GENRE_NAMES = Object.entries(GENRES).map(genre => genre[1].name)

module.exports = {
  GENRES,
  GENRE_IDS,
  GENRE_NAMES
}
