const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const qr = require('qrcode');
const { User, Prescription, Patient } = require("./models/User");
const path = require("path");
const port = 5000;

const app = express();



// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: 'strict'
  }
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  res.render("login.ejs");
});

app.post('/login', async (req, res) => {
  const { aadhar, password } = req.body;
  try {
    const user = await User.findOne({ aadhar });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect Aadhar number or password' });
    }
    // Store user data in session
    req.session.user = user;

    // Fetch data after successful login
    const patientData = await Patient.findOne({ AdharNo: user.aadhar });
    const prescriptionData = await Prescription.find({ adharnum: user.aadhar });
    //console.log("User session:", req.session.user); // Debugging
    const serializedData = JSON.stringify({ patientData, prescriptionData });
    //console.log(serializedData);
    res.render('index', { data: serializedData });
  } catch (err) {
    console.error("Login error:", err); // Debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout error:", err);
      res.status(500).json({ message: 'Error logging out' });
    } else {
      res.redirect('/'); 
    }
  });
});

// Signup route
app.post('/register', async (req, res) => {
  const { aadhar, password } = req.body;
  try {
    const existingUser = await User.findOne({ aadhar });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ aadhar, password });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/generate', (req, res) => {
  const data = req.body.data; // Corrected way to access data from the request body
 // console.log(data);

  if (!data) {
    return res.status(400).send('Please enter data to generate QR code');
  }

  qr.toDataURL(data, (err, url) => {
    if (err) {
      return res.status(500).send('Error generating QR code');
    }
    res.send({ qrUrl: url });
  });
});



app.listen(port, console.log(`Server started on port ${port}`));
