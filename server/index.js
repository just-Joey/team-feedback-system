
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


const userRoute = require('./routes/users');
const teamsroute = require('./routes/teams');
const feedbackRoute = require('./routes/feedback');


//Middleware
app.use(cors());
app.use(express.json());

//Routes

app.use('/users', require('./routes/users'));

app.get('/', (req, res) => res.send('API is live'));
// app.use('/api/users', userRoute);
// app.use('/api/teams', teamsroute);
// app.use('/api/feedback', feedbackRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});