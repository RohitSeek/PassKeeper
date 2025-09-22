const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');  

// SETTING UP DOTENV
dotenv.config({ path: "./config.env" });

// MIDDLEWARE to allow front end to access the server
console.log(process.env.CLIENT_URL);

// for development purpose
app.use(cors({credentials: true, origin:process.env.CLIENT_URL}));

const allowedOrigins = [
    process.env.CLIENT_URL1, // Add the first client URL
    process.env.CLIENT_URL2  // Add the second client URL
    // Add more URLs as needed
  ];
  const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };

app.use(cors(corsOptions));

app.use(cookieParser());   



const PORT = process.env.PORT || 8000;

// CONNECTING WITH DATABASE
require("./db/connection");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// LINKING THE ROUTER FILES 
app.use(require("./router/routing"));




// LISTENING TO PORT 
app.listen(PORT, () =>
{
    console.log(`listening to port : http://localhost:${PORT}/`)
})