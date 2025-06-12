const conn = require('../config/db');

class User {
  static async findByEmail(email) {
    const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(user) {
    const { full_name, email, phone, password } = user;
    const [result] = await conn.query(
      'INSERT INTO users (full_name, phone, email, password) VALUES (?, ?, ?, ?)',
      [full_name, email, phone, password]
    );
    return { id: result.insertId, full_name, email, phone };
  }

  static async findById(id) {
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  // userModel.js
  static async update(id, updateData) {
    const { full_name, email, phone } = updateData;
    await conn.query(
      'UPDATE users SET full_name = ?, email = ?, phone = ? WHERE id = ?',
      [full_name, email, phone, id]
    );
    return this.findById(id); // Return the updated user
  }
}

module.exports = User;