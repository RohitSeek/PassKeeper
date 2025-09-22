const mongoose = require("mongoose");
const DB = process.env.DATABASE;


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() =>
{
    console.log("Connection success.");
})
.catch((error) =>
{
    console.log("DB Connection failed.");
    
    console.log(error)
})