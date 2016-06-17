const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");


const app = express();

// MongoDB
mongoose.connect("mongodb://localhost/movie-advisor", (error) => {
    if (!error)
    {
        console.log("MongoDB is now connected");
    }
    else
    {
        console.error(error);
    }
});
require("./lib/model");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Webpack middleware
const compiler = webpack(require("./webpack.config"))
app.use(webpackDevMiddleware(compiler, {
    publicPath: "/assets"
}));

// Routes
const routes = require("./routes/index");
app.use("/", routes);

module.exports = app;
