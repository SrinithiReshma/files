const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock Database
let students = [
    { id: 1, name: "John Doe", age: 20, course: "Computer Science" },
    { id: 2, name: "Jane Smith", age: 22, course: "Mathematics" }
];

// Routes

// Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Get a single student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// Add a new student
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Update a student by ID
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        student.name = req.body.name || student.name;
        student.age = req.body.age || student.age;
        student.course = req.body.course || student.course;
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex !== -1) {
        const deletedStudent = students.splice(studentIndex, 1);
        res.json(deletedStudent);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
