const conn = require('../config/db');

class Measurements {

  static async create(measurementData) {
    const { baby_id, weight, height, immunization_status, measurement_date } = measurementData;
    
    const [result] = await conn.query(
      `INSERT INTO measurements 
      (baby_id, weight, height, immunization_status, measurement_date) 
      VALUES (?, ?, ?, ?, ?)`,
      [baby_id, weight, height, immunization_status || null, measurement_date || new Date() || null]
    );
    
    return this.findById(result.insertId);
  }

  // Ubah method findAll()
  static async findAll() {
    const [results] = await conn.query(`
      SELECT 
        m.*, 
        b.name AS baby_name, 
        b.weight AS birth_weight, 
        b.height AS birth_height,
        b.gestational_age
      FROM measurements m
      JOIN babies b ON m.baby_id = b.id
      ORDER BY m.measurement_date DESC
    `);
    return results;
  }

  static async findById(id) {
    const [rows] = await conn.query(`
      SELECT 
        m.*, 
        b.name AS baby_name, 
        b.weight AS birth_weight, 
        b.height AS birth_height,
        b.gestational_age
      FROM measurements m
      JOIN babies b ON m.baby_id = b.id
      WHERE m.id = ?
    `, [id]);
    return rows[0];
  }

  static async findByBabyId(baby_id) {
    const [rows] = await conn.query(`
      SELECT 
        m.*, 
        b.name AS baby_name, 
        b.weight AS birth_weight, 
        b.height AS birth_height,
        b.gestational_age
      FROM measurements m
      JOIN babies b ON m.baby_id = b.id
      WHERE m.baby_id = ?
      ORDER BY m.measurement_date DESC
    `, [baby_id]);
    return rows;
  }


  

}

module.exports = Measurements;