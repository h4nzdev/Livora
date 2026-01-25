const express = require('express');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.send('Livora Backend with Supabase is running...');
});

// Example endpoint to test connection
app.get('/api/test-db', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1);
    
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ message: 'Supabase Connected', data });
});

// Endpoint to fetch properties
app.get('/api/properties', async (req, res) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*');
    
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
