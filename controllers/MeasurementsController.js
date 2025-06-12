const Joi = require('joi');
const Measurements = require('../models/MeasurementsModel');

const MeasurementsController = {

  async getAll(req, res) {
    try {
      const measurements = await Measurements.findAll();
  
      res.json({
        success: true,
        data: measurements
      });
    } catch (error) {
      console.error("Error fetching all measurements:", error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },
  
  // Create new measurement
  async create(req, res) {
    try {
      // Validasi schema menggunakan Joi
      const schema = Joi.object({
        baby_id: Joi.number().required().messages({
          'any.required': 'baby_id wajib diisi',
          'number.base': 'baby_id harus berupa angka',
        }),
        weight: Joi.number().min(0.5).max(50).required().messages({
          'any.required': 'Berat badan wajib diisi',
          'number.base': 'Berat badan harus berupa angka',
          'number.min': 'Berat badan minimal 0.5 kg',
          'number.max': 'Berat badan maksimal 50 kg'
        }),
        height: Joi.number().min(30).max(150).required().messages({
          'any.required': 'Tinggi badan wajib diisi',
          'number.base': 'Tinggi badan harus berupa angka',
          'number.min': 'Tinggi badan minimal 30 cm',
          'number.max': 'Tinggi badan maksimal 150 cm'
        }),
        immunization_status: Joi.string().valid('complete', 'incomplete', 'not_started').required().messages({
          'any.required': 'Status imunisasi wajib diisi',
          'any.only': 'Status imunisasi tidak valid'
        }),
        measurement_date: Joi.date().optional().messages({
          'date.base': 'Tanggal pengukuran tidak valid'
        })
      });
  
      // Jalankan validasi
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message
        });
      }
  
      // Buat data pengukuran
      const measurementData = {
        baby_id: value.baby_id,
        weight: parseFloat(value.weight),
        height: parseFloat(value.height),
        immunization_status: value.immunization_status,
        measurement_date: value.measurement_date || new Date()
      };
  
      const newMeasurement = await Measurements.create(measurementData);
  
      res.status(201).json({
        success: true,
        data: newMeasurement,
        message: 'Pengukuran berhasil dicatat'
      });
    } catch (error) {
      console.error('Error creating measurement:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Get measurement by ID
  async getById(req, res) {
    try {
      const measurement = await Measurements.findById(req.params.id);
      
      if (!measurement) {
        return res.status(404).json({
          success: false,
          message: 'Data pengukuran tidak ditemukan'
        });
      }
      
      res.json({
        success: true,
        data: measurement
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Get all measurements for a baby
  async getByBabyId(req, res) {
    try {
      const measurements = await Measurements.findByBabyId(req.params.baby_id);
      
      res.json({
        success: true,
        data: measurements
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Update measurement
  async update(req, res) {
    try {
      const allowedUpdates = ['weight', 'height', 'immunization_status', 'measurement_date', 'notes'];
      const updates = {};
      
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Tidak ada field valid untuk diupdate'
        });
      }

      const updatedMeasurement = await Measurements.update(req.params.id, updates);
      
      res.json({
        success: true,
        data: updatedMeasurement,
        message: 'Pengukuran berhasil diperbarui'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Delete measurement
  async delete(req, res) {
    try {
      await Measurements.delete(req.params.id);
      
      res.json({
        success: true,
        message: 'Pengukuran berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }
};

module.exports = MeasurementsController;