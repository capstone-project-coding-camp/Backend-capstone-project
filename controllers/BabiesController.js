const Joi = require('joi');
const Babies = require('../models/BabiesModel');

const BabiesController = {
  /**
   * Create a new baby record
   */
  async create(req, res) {
    try {
      // Validation schema
      const schema = Joi.object({
        name: Joi.string().min(3).max(100).required()
          .messages({
            'string.empty': 'Nama balita tidak boleh kosong',
            'string.min': 'Nama balita minimal 3 karakter'
          }),
        weight: Joi.number().min(0).max(50).required()
          .messages({
            'number.base': 'Berat badan harus berupa angka',
            'number.min': 'Berat badan tidak boleh negatif'
          }),
        height: Joi.number().min(30).max(150).required()
          .messages({
            'number.base': 'Tinggi badan harus berupa angka',
            'number.min': 'Tinggi badan minimal 30 cm'
          }),
        gestational_age: Joi.number().min(20).max(45).required()
          .messages({
            'number.base': 'Usia kehamilan harus berupa angka',
            'number.min': 'Usia kehamilan minimal 20 minggu'
          }),
        // immunization_status: Joi.string()
        //   .valid('complete', 'incomplete', 'not_started')
        //   .required()
        //   .messages({
        //     'any.only': 'Status imunisasi tidak valid'
        //   }),
        // economic_status: Joi.string()
        //   .valid('capable', 'less_capable', 'incapable')
        //   .required()
        //   .messages({
        //     'any.only': 'Status ekonomi tidak valid'
        //   })
      });

      // Validate input
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message
        });
      }

      // Get user_id from authenticated user
      const babyData = {
        ...value,
        user_id: req.user.id,
        weight: parseFloat(value.weight),
        height: parseFloat(value.height),
        gestational_age: parseInt(value.gestational_age)
      };

      // Create baby only
      const newBaby = await Babies.create(babyData);
      
      res.status(201).json({
        success: true,
        data: newBaby,
        message: 'Data balita berhasil ditambahkan'
      });
    } catch (error) {
      console.error('Error creating baby:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: error.message
      });
    }
  },

  /**
   * Get baby by ID
   */
  async getById(req, res) {
    try {
      const baby = await Babies.findById(req.params.id);
      
      if (!baby) {
        return res.status(404).json({
          success: false,
          message: 'Data balita tidak ditemukan'
        });
      }
      
      res.json({
        success: true,
        data: baby
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: error.message
      });
    }
  },

  /**
   * Update baby data
   */
  async update(req, res) {
    try {
      // Validation schema (all fields optional for update)
      const schema = Joi.object({
        name: Joi.string().min(3).max(100)
          .messages({
            'string.empty': 'Nama balita tidak boleh kosong',
            'string.min': 'Nama balita minimal 3 karakter'
          }),
        weight: Joi.number().min(0).max(50)
          .messages({
            'number.base': 'Berat badan harus berupa angka',
            'number.min': 'Berat badan tidak boleh negatif'
          }),
        height: Joi.number().min(30).max(150)
          .messages({
            'number.base': 'Tinggi badan harus berupa angka',
            'number.min': 'Tinggi badan minimal 30 cm'
          }),
        gestational_age: Joi.number().min(20).max(45)
          .messages({
            'number.base': 'Usia kehamilan harus berupa angka',
            'number.min': 'Usia kehamilan minimal 20 minggu'
          }),
        immunization_status: Joi.string()
          .valid('complete', 'incomplete', 'not_started')
          .messages({
            'any.only': 'Status imunisasi tidak valid'
          })
      });

      // Validate input
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message
        });
      }

      // Check if baby exists
      const baby = await Babies.findById(req.params.id);
      if (!baby) {
        return res.status(404).json({
          success: false,
          message: 'Data balita tidak ditemukan'
        });
      }

      // Update only provided fields
      const updates = {};
      Object.keys(value).forEach(key => {
        if (value[key] !== undefined) {
          updates[key] = value[key];
        }
      });

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Tidak ada data yang diperbarui'
        });
      }

      // Update baby
      const updatedBaby = await Babies.update(req.params.id, updates);
      
      res.json({
        success: true,
        data: updatedBaby,
        message: 'Data balita berhasil diperbarui'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: error.message
      });
    }
  },
};

module.exports = BabiesController;