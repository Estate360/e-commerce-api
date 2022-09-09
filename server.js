const dotEnv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message, err.stack);
  console.log("Uncaught Exception! Shouting down...");
  process.exit(1);
});

dotEnv.config();
const app = require("./app");

// console.log(process.env);

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully!");
  });

const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App successfully running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection! Shouting down...");
  server.close(() => {
    process.exit(1);
  });
});
