import express from "express";

const PORT = process.env.PORT || 3030;

const app = express();

const magicNumber = 42;

app.get("/", (req, res) => {
  res.status(200).send('Hello world');
});

const server = app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);

export { server, magicNumber };

export default app;
