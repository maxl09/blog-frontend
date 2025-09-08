const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
// const nodemailer = require("nodemailer");

const app = express()
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173", // for local dev
        "https://ply-instagram-clone.vercel.app" // your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blog-page");

const PORT = process.env.PORT || 5002;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);

// Email transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'noreply.ply.auth@gmail.com',
//         pass: 'pxzg opui oien isip'
//     }
// })

// Sign up
app.post('/signup', async (req, res) => {
    try {
        const { name, username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'User created successfully' })
    } catch (err) {
        res.status(400).json({ error: "User already exists" })
    }
})

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ error: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretKey", { expiresIn: '1h' });
    res.json({ token })
})

// Protected route
app.post('/', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "Access denied" })
    }

    try {
        const verified = jwt.verify(token, "secretKey");
        res.json({ message: "Welcome!", userId: verified.id })
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' })
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
