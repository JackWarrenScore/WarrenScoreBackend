// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'WarrenScoreDB',
      user:     'postgres',
      password: 'a'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'WarrenScoreDB',
      user:     'postgres',
      password: 'a'
    }
  }

};
