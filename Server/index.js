const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://mgayashan83:mgayashan83@cluster-crud.xmroksr.mongodb.net/mern-tutorial?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB CONNECTED SUCCESSFULLY.....");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/getUsers", async (req, res) => {
  try {
    const result = await UserModel.find({}).exec();
    console.log(result); // Log the result to the console
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.json({ error: error.message });
  }
});

// Create a user
// Create a user
app.post("/createUsers", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    console.log("User created:", newUser);
    res.json(newUser);
  } catch {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a user
app.delete("/deleteUser/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    await UserModel.findByIdAndDelete(userId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update users
app.put("/updateUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { name, age, username } = req.body;

  try {
    await UserModel.findByIdAndUpdate(userId, { name, age, username });
    res.json({ success: true });
    
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`SERVER RUNS PERFECTLY IN PORT ${PORT}!`);
});
