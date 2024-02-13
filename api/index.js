import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import listingRoutes from './routes/listing.routes.js';
import bodyParser from 'body-parser';

// getting the secret credentiols
dotenv.config();

// getting the DB connection
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to the MongoDB");
}).catch((err) => {
    console.log(err);
})

const app = express();

// set the ejs file public and render to the browser
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(express.json());

app.listen(5000, () => {
    console.log("Server is running on 5000");
})

app.route("/").get(function(req, res){
    res.render("index");
})

app.use("/api/listing", listingRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });