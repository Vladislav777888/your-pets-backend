const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});

// birthdate 1914-01-01