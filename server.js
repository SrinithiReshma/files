// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Event schema and model
const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    location: String,
    description: String
});

const Event = mongoose.model('Event', eventSchema);

// Routes
// Get all events
app.get('/get-events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).send('Error retrieving events');
    }
});

// Add a new event
app.post('/add-event', async (req, res) => {
    const newEvent = new Event(req.body);
    try {
        await newEvent.save();
        res.json({ message: 'Event added successfully' });
    } catch (err) {
        res.status(400).send('Error adding event');
    }
});

// Delete an event
app.delete('/delete-event/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(400).send('Error deleting event');
    }
});

// Update an event
app.put('/update-event/:id', async (req, res) => {
    try {
        await Event.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Event updated successfully' });
    } catch (err) {
        res.status(400).send('Error updating event');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
