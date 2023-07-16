const dotenv = require("dotenv");
dotenv.config({ path: './packages/backend/.env' });
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000
const DB = process.env.DB_HOST

const connection = mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Server running on port: ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
