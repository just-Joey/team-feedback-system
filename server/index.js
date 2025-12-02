
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use((req, res, next) => {
  console.log("REQ:", req.method, JSON.stringify(req.url));
  next();
});



const userRoute = require('./routes/users');
const teamsroute = require('./routes/teams');
const feedbackRoute = require('./routes/feedback');
const tagsRoute = require('./routes/tags');


//Middleware
app.use(cors());
app.use(express.json());

//Routes

app.use('/users', require('./routes/users'));
app.use('/teams', require('./routes/teams'));
app.use('/feedback', require('./routes/feedback'));
app.use('/tags', require('./routes/tags'));

//Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API is live'
  });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});