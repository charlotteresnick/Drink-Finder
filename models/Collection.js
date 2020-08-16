const db = require('../db/config');

class Collection {
  constructor({ id, user_id, name, drink_exists }) {
    this.id = id || null;
    this.user_id = user_id;
    this.name = name;
    this.drink_exists = drink_exists
  }

  static getAll(user_id) {
    return db.query(`SELECT * FROM collections WHERE user_id = $1`, user_id)
    .then((collections) => collections.map((collection) => new this(collection)));
  }

  static getById(id) {
    return db
    .oneOrNone(`
    SELECT * FROM collections
    WHERE id =  $1`, id)
    .then((collection) => {
      if (collection) return new this(collection)
      else throw new Error('No collection found')
    });
  }

  static getByUserIdAndDrinkId(user_id, drink_id) {
    return db
    .query(`
    SELECT id, name, bool_or(drink_exists) as "drink_exists" FROM
      (SELECT c.id, c.name,
        CASE WHEN s.drink_id = $1
          THEN TRUE
          ELSE FALSE
        END drink_exists
      FROM collections c LEFT JOIN saves s on s.collection_id = c.id
      WHERE c.user_id = $2) as saves
    GROUP BY saves.id, saves.name;
    `, [drink_id, user_id])
    .then((collections) => collections.map((collection) => new this(collection)));
  }

  save() {
    return  db
    .one(`
    INSERT INTO collections
    (name, user_id)
    VALUES ($/name/, $/user_id/)
    RETURNING *`, this)
    .then((savedCollection) => Object.assign(this, savedCollection));
  }

  update(changes) {
    Object.assign(this, changes);
    return db
    .one(`
    UPDATE collections SET
    name = $/name/
    WHERE id = $/id/
    RETURNING *`, this)
    .then((updatedCollection) => Object.assign(this, updatedCollection));
  }

  delete() {
    return db.none(`DELETE FROM collections WHERE id = $/id/`, this);
  }
}

module.exports = Collection;