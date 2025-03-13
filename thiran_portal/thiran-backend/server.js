const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection setup
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB once at startup
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit if we can't connect to the database
  }
}

// Connect to MongoDB when the server starts
connectToMongoDB();

// Function to generate a random 10-character passcode
const generatePasscode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let passcode = '';
  for (let i = 0; i < 10; i++) {
    passcode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return passcode;
};

// Create team endpoint
app.post('/api/create-team', async (req, res) => {
  const { name, username } = req.body; // Get the team name and username from the request
  console.log('Creating team:', { name, username });
  
  const passcode = generatePasscode(); // Generate a random passcode

  try {
    const database = client.db("user_activity");
    const teamsCollection = database.collection("teams");
    const usersCollection = database.collection("users");

    // Check if the team name already exists
    const existingTeam = await teamsCollection.findOne({ name });
    if (existingTeam) {
      console.log('Team name already exists:', name);
      return res.status(400).json({ message: 'Team name already exists.' });
    }

    const newTeam = { name, passcode };
    const result = await teamsCollection.insertOne(newTeam);
    
    // Convert ObjectId to string to avoid serialization issues
    const teamId = result.insertedId.toString();
    console.log('Team created with ID:', teamId);

    // Add the team to the user's teams array
    if (username) {
      await usersCollection.updateOne(
        { username },
        { $addToSet: { teams: { teamId, name } } }
      );
      console.log('Team added to user:', username);
    }

    const response = { 
      message: 'Team created successfully.', 
      passcode,
      team: { id: teamId, name }
    };
    console.log('Sending response:', response);
    res.status(201).json(response); // Return the passcode to the team leader
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const database = client.db("user_activity");
    const usersCollection = database.collection("users");

    // Check if the username already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Initialize with empty teams array
    const newUser = { 
      username, 
      email, 
      password: hashedPassword, 
      teams: [] 
    };
    
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const database = client.db("user_activity");
    const usersCollection = database.collection("users");

    // Find user by username
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    res.status(200).json({ message: 'Login successful', userData: { username: user.username, userId: user._id.toString() } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Database error' });
  }
});

// Join team endpoint
app.post('/api/join-team', async (req, res) => {
  const { name, passcode, username } = req.body; // Get the team name, passcode and username
  console.log('Join team request:', { name, passcode, username });

  try {
    const database = client.db("user_activity");
    const teamsCollection = database.collection("teams");
    const usersCollection = database.collection("users");

    // Find the team by name and passcode
    const team = await teamsCollection.findOne({ name, passcode });
    console.log('Team found:', team);
    
    if (!team) {
      console.log('Team not found or incorrect passcode');
      return res.status(400).json({ message: 'Team not found or incorrect passcode.' });
    }

    // Update the user's teams array
    if (username) {
      // Convert ObjectId to string to avoid serialization issues
      const teamInfo = { 
        teamId: team._id.toString(), 
        name: team.name 
      };
      console.log('Adding team to user:', teamInfo);
      
      await usersCollection.updateOne(
        { username },
        { $addToSet: { teams: teamInfo } }
      );

      const response = { 
        message: 'Successfully joined the team!',
        team: { id: team._id.toString(), name: team.name }
      };
      console.log('Sending response:', response);
      
      // If found, alert the user that they have successfully joined the team
      res.status(200).json(response);
    } else {
      console.log('Username is required but not provided');
      res.status(400).json({ message: 'Username is required to join a team.' });
    }
  } catch (error) {
    console.error('Error joining team:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user teams endpoint
app.get('/api/user-teams/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const database = client.db("user_activity");
    const usersCollection = database.collection("users");

    // Find the user
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's teams
    res.status(200).json({ teams: user.teams || [] });
  } catch (error) {
    console.error('Error fetching user teams:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});