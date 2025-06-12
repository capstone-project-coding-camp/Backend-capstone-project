const conn = require('../config/db');

class Babies {

  static async create(user) {
    const { user_id, name, weight, height, gestational_age } = user;
    const [result] = await conn.query(
      'INSERT INTO babies (user_id, name, weight, height, gestational_age) VALUES (?, ?, ?, ?, ?)',
      [user_id, name, weight, height, gestational_age]
    );
    return { id: result.insertId, name, weight, height ,gestational_age};
  }

  static async findById(id) {
    const [rows] = await conn.query('SELECT * FROM babies WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Babies;