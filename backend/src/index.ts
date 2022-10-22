import express from "express";

const PORT = process.env.PORT || 3030;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
