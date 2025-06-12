const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/routes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', routes);

// Test route
app.get('/', (req, res) => {
  res.send('Authentication API is running...');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});