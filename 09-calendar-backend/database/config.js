const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("The database is up!");
  } catch (error) {
    console.log(error);
    throw new Error("Error getting the database connection");
  }
};

module.exports = {
  dbConnection,
};
