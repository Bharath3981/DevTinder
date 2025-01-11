const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from the server! with nodemon");
})

app.listen(3000, () => {
    console.log("Server is succesfully listening on port 3000");
});