// server.js
const express = require('express');
const dotenv = require('dotenv');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const batchRoutes = require('./routes/batchRoutes');
const videoRoutes = require('./routes/videoRoutes');

dotenv.config();
const app = express();
app.use(express.json());
// Initialize Passport
app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/batch', batchRoutes);
app.use('/api/videos', videoRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
