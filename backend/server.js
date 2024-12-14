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
const session = require("express-session");

const cors = require('cors');
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "secret", // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to `true` in production when using HTTPS
  })
);
// Initialize Passport
app.use(cors({
    origin: 'http://localhost:5002', // Replace with your frontend URL
    credentials: true,               // Enable cookies for cross-origin requests if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
/* `app.use('/api/user', userRoutes);` is mounting the `userRoutes` middleware at the `/api/user`
endpoint in the Express application. This means that any requests that start with `/api/user` will
be handled by the routes defined in the `userRoutes` module. */
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/batch', batchRoutes);
app.use('/api/videos', videoRoutes);
// Configure CORS

app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
    res.redirect(process.env.FRONTEND_URL+"/courses");
    console.log("Successful login.");
    });

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
