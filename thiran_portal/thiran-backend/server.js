const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("user_activity");
    const usersCollection = database.collection("users");

    // Check if the username already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword };
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for username:', username);

  try {
    await client.connect();
    const database = client.db("user_activity");
    const usersCollection = database.collection("users");

    // Find user by username
    const user = await usersCollection.findOne({ username });
    console.log('User found:', user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    res.status(200).json({ message: 'Login successful', userData: { username: user.username, userId: user._id } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Database error' });
  } finally {
    await client.close();
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
