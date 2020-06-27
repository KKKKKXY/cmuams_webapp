const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
// Config dotev
require('dotenv').config({
    path: './config/.env'
})


const app = express()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// Connect to database
connectDB();

// body parser
app.use(bodyParser.json())

// Load routes
const authRouter = require('./routes/auth.route')
// const userRouter = require('./routes/users.route')

// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

// Use Routes
app.use( '/api',authRouter)
// app.use('/api', userRouter)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})




// const express = require('express');
// // const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection estabished successfully",uri);
// })

// // const usersRouter = require('./routes/users');
// // app.use('/users', usersRouter);


// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });