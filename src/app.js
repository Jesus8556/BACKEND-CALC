const express = require("express");
const cors = require("cors");
const http = require("http");

const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth",authRoutes);


module.exports = {
    app
}