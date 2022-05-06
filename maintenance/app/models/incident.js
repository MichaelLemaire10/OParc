const db = require("../database");

class Incident {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async listing() {
    try {
      const { rows } = await db.query(
        "SELECT incident.*, attraction.public_name FROM incident JOIN attraction_incident ON incident.id = incident_id JOIN attraction ON attraction.id = attraction_id ORDER BY id;"
      );
      return rows.map((row) => new Incident(row));
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }
  static async currentIncident(id) {
    try {
      const { rows } = await db.query("SELECT * FROM incident WHERE id=$1", [
        id,
      ]);
      if (rows[0]) {
        return new Incident(rows[0]);
      }
      return null;
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }
  async save() {
    try {
      const { rows } = await db.query(
        "INSERT INTO incident(origin) VALUES($1) RETURNING *;",
        [this.origin]
      );
      this.id = rows[0].id;
      await db.query("INSERT INTO attraction_incident VALUES ($1, $2);", [
        this.attraction_id,
        this.id,
      ]);
      return this;
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }
  async update() {
    try {
      //On selectionne et execute la fonction créer en SQL
      await db.query("SELECT * FROM update_incident($1)", [this]);
      return;
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }
  static async delete(id) {
    try {
      await db.query("DELETE FROM attraction_incident WHERE incident_id=$1;", [
        id,
      ]);
      await db.query("DELETE FROM incident WHERE id=$1;", [id]);
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }
}
module.exports = Incident;
