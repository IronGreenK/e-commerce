const ROLES = {
  2: {
    name: 'user',
    description: 'user who can buy games'
  },
  1: {
    name: 'vendor',
    description: 'user who can edit and sell games '
  }
}

const ROLE_IDS = Object.keys(ROLES)

const ROLE_NAMES = Object.entries(ROLES).map(role => role[1].name)

module.exports = {
  ROLES,
  ROLE_IDS,
  ROLE_NAMES
}
