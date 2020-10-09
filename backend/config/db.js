const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },(err)=>{
        if(err) throw err;
        console.log("MongoDB Connected");
    });
}; 

module.exports = connectDB;