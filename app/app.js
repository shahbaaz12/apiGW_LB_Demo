// Simple Express app connected to MongoDB
const express = require('express');
const mongoose = require('mongoose');
const os = require('os');
const User = require('./models/user');

const app = express();
app.use(express.json());

// environment variables (passed from docker-compose)
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/usersdb';
const INSTANCE_NAME = process.env.INSTANCE_NAME || os.hostname();

// connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log(`[${INSTANCE_NAME}] Connected to MongoDB`))
  .catch(err => console.error('MongoDB connection error:', err.message));

// basic CRUD routes
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ instance: INSTANCE_NAME, user });
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json({ instance: INSTANCE_NAME, users });
});

// health endpoint (useful for Nginx health checks)
app.get('/health', (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  if (dbReady) res.status(200).send('OK');
  else res.status(500).send('DB not ready');
});

// start server
app.listen(PORT, () => {
  console.log(`[${INSTANCE_NAME}] Running on port ${PORT}`);
});
