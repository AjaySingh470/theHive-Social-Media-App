const mongoose = require("mongoose");

module.exports = async() =>{
    const mongoUri = 'mongodb+srv://socialmdia:asrasr123@cluster0.wrlt5fa.mongodb.net/?retryWrites=true&w=majority';
    try{
        const connect = await mongoose.connect(mongoUri , {
            useUnifiedTopology : true,
            useNewUrlParser : true
        });
        console.log("Mongo DB connected :" + connect.connection.host);
    }
    catch (error)
    {
        console.log(error);
        process.exit(1);
    }
}
