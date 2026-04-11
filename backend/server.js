const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const app = express();

// jwt
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
    res.send('Backend Running 🚀');
});

// const mongoose = require('mongoose');

const mongoiseLink = 'mongodb+srv://maheshji:Mahesh7662@cluster0.xsi0m06.mongodb.net/financeDB?retryWrites=true&w=majority';

mongoose.connect(mongoiseLink)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Register Api Call
app.post('/api/register', async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // check user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // save user
        const user = new User({ name, email, password });
        await user.save();

        res.json({ success: true, message: 'User Registered Successfully' });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//Login User Api Call
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // check user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // check password
        if (user.password !== password) {
            return res.json({ success: false, message: 'Invalid password' });
        }
        // 🔥 CREATE TOKEN
        const token = jwt.sign(
            { userId: user._id },
            SECRET_KEY,
            { expiresIn: '1d' }
        );

        // success
        res.json({
            success: true,
            message: 'Login success',
            token,
            user: user
        });


    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

const auth = require('./middleware/auth');

app.get('/api/profile', auth, (req, res) => {
    res.json({
        success: true,
        userId: req.userId
    });
});