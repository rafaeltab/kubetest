import express from "express";

const PORT = process.env.PORT || 45000;

const app = express();

app.get("/", (req, res) => {
    res.send("Connection made");
});

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});
