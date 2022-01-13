import mongoose from "mongoose";
mongoose.connect("mongodb+srv://riddhishwar:Mayurie@zomato-master.joubs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>console.log('Database Successfully connected...')).catch(()=>console.log('Database connection failed...'));

const dbConn=mongoose.connection;

export default dbConn;
