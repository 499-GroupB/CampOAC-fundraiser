const express = require("express");
const app = express();
const path = require("path");

// configure
app.use(express.static(path.join(__dirname, "..", "build")));

// Start express and listen on port 5000
app.listen(3000, () => {
    console.log("server started on port 3000");
});