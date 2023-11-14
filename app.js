const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mentor_student_assignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Mentor and Student models
const Mentor = mongoose.model('Mentor', {
    name: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Student = mongoose.model('Student', {
    name: String,
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
});

// Endpoint to create a Mentor
app.post('/createMentor', async (req, res) => {
    // Your logic to create a Mentor
    app.post('/createMentor', async (req, res) => {
        const { name } = req.body;
        const mentor = new Mentor({ name });
        await mentor.save();
        res.status(201).json({ message: 'Mentor created successfully', mentor });
    });
});

// Endpoint to create a Student
app.post('/createStudent', async (req, res) => {
    // Your logic to create a Student
    app.post('/createStudent', async (req, res) => {
        const { name } = req.body;
        const student = new Student({ name });
        await student.save();
        res.status(201).json({ message: 'Student created successfully', student });
    });
});

// Endpoint to assign a Student to a Mentor
app.post('/assignStudentToMentor', async (req, res) => {
    // Your logic to assign a Student to a Mentor
    app.post('/assignStudentToMentor', async (req, res) => {
        const { mentorId, studentId } = req.body;
        const mentor = await Mentor.findById(mentorId);
        const student = await Student.findById(studentId);
    
        if (!mentor || !student) {
            return res.status(404).json({ message: 'Mentor or Student not found' });
        }
    
        mentor.students.push(student);
        student.mentor = mentor;
        await mentor.save();
        await student.save();
    
        res.status(200).json({ message: 'Student assigned to Mentor successfully' });
    });
});

// Endpoint to assign or change Mentor for a particular Student
app.post('/assignMentorToStudent', async (req, res) => {
    // Your logic to assign or change Mentor for a particular Student
    app.post('/assignMentorToStudent', async (req, res) => {
        const { mentorId, studentId } = req.body;
        const mentor = await Mentor.findById(mentorId);
        const student = await Student.findById(studentId);
    
        if (!mentor || !student) {
            return res.status(404).json({ message: 'Mentor or Student not found' });
        }
    
        student.mentor = mentor;
        await student.save();
    
        res.status(200).json({ message: 'Mentor assigned to Student successfully' });
    });
    
});

// Endpoint to show all students for a particular mentor
app.get('/studentsForMentor/:mentorId', async (req, res) => {
    // Your logic to show all students for a particular mentor
    app.get('/studentsForMentor/:mentorId', async (req, res) => {
        const { mentorId } = req.params;
        const mentor = await Mentor.findById(mentorId).populate('students');
    
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
    
        res.status(200).json({ students: mentor.students });
    });
});

// Endpoint to show the previously assigned mentor for a particular student
app.get('/previousMentorForStudent/:studentId', async (req, res) => {
    // Your logic to show the previously assigned mentor for a particular student
    app.get('/previousMentorForStudent/:studentId', async (req, res) => {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('mentor');
    
        if (!student || !student.mentor) {
            return res.status(404).json({ message: 'Student or Previous Mentor not found' });
        }
    
        res.status(200).json({ previousMentor: student.mentor });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
