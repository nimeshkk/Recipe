//mongodb+srv://slhit2021:EqLTOtvBfTUzSM11@cluster0.oyd0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db.js');
const User = require('./models/user.js');

const app = express();
app.use(express.json());
app.use(cors());


app.post('/register', async (req, res) => {
    User.create(req.body)
    .then(register =>res.json(register))
    .catch(err => res.status(400).json('Error: ' + err))
    
});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User
    .findOne
    ({ email, password })
    .exec();
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    return res.json(user);

    
    
}
);


connectDB();
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});