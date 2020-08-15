const db = require('../db/config');

class Collection {
  constructor({ id, user_id, name }) {
    this.id = id || null;
    this.user_id = user_id;
    this.name = name;
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