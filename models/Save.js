const db = require('../db/config');

class Save {
  constructor ({ id, cocktailId, collectionId }) {
    this.id = id || null;
    this.cocktailId = cocktailId;
    this.collectionId = collectionId;
  }

  static getAll(collectionId) {
    return db.query(`SELECT * FROM saves WHERE collection_id = $1`, collectionId)
    .then((drinks) => drinks.map((drink) => new this(drink)));
  }

  static getById(id) {
    return db
    .oneOrNone(`
    SELECT * FROM saves
    WHERE id = $1`, id)
    .then((drink) => {
      if (drink) return new this (drink)
      else throw new Error('No drink found')
    });
  }

  save() {
    return db
    .one(`
    INSERT INTO saves
    (collection_id, drink_id)
    VALUES ($/collectionId/, $/cocktailId/)
    RETURNING *`, this)
    .then((save) => Object.assign(this, save));
  }

  update(changes) {
    Object.assign(this, changes);
    return db
    .one(`
    UPDATE saves SET
    collection_id = $/collectionId/
    WHERE id = $/id/
    RETURNING *`, this)
    .then((updatedDrink) => Object.assign(this, updatedDrink));
  }

  delete() {
    return db.none(`DELETE FROM saves WHERE id = $/id/`, this);
  }
}

module.exports = Save;