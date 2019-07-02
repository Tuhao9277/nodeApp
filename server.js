const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser')

// import user.js
const users = require('./routes/api/user')
//Db config
const db = require('./config/keys').mongoURI;

app.use(bodyParser.urlencoded({extended: false})); // Parsing x-www-form-urlencoded
app.use(bodyParser.json()); // Using it with urlencoded

//connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log("mongodb has connected")
    }).catch((err) => {
        console.log(err)
    })
//Init passport
app.use(passport.initialize());
require('./config/passport')(passport);
// app.get('/', (req, res) => {
//     res.send("hello");
// });

// use routes
app.use("/api/users",users);
// use body-parse middleware


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});