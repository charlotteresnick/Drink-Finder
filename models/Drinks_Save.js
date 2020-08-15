const db = require('../db/config');

class SavedDrink {
  constructor ({ id, drink_id, collection_id }) {
    this.id = id || null;
    this.drink_id = drink_id;
    this.collection_id = collection_id;
  }

  static getAll(collection_id) {
    return db.query(`SELECT * FROM drink_save WHERE collection_id = $1`, collection_id)
    .then((drinks) => drinks.map((drink) => new this(drink)));
  }

  static getById(id) {
    return db
    .oneOrNone(`
    SELECT * FROM drink_save
    WHERE id = $1`, id)
    .then((drink) => {
      if (drink) return new this (drink)
      else throw new Error('No drink found')
    });
  }

  save() {
    return db
    .one(`
    INSERT INTO drink_save
    (collection_id, drink_id)
    VALUES ($/collection_id/, $/drink_id/)
    RETURNING *`, this)
    .then((savedDrink) => Object.assign(this, savedDrink));
  }

  update(changes) {
    Object.assign(this, changes);
    return db
    .one(`
    UPDATE drink_save SET
    collection_id = $/collection_id/
    WHERE id = $/id/
    RETURNING *`, this)
    .then((updatedDrink) => Object.assign(this, updatedDrink));
  }

  delete() {
    return db.none(`DELETE FROM drink_save WHERE id = $/id/`, this);
  }
}

module.exports = SavedDrink;