const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const uri = process.env.REACT_APP_AUTH;

console.log(process.env.PORT);
console.log(process.env.SECRET);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB (Mongoose) connected"))
  .catch((err) => console.log(err));

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db, galleryCollection;
async function connectToDatabase() {
  await client.connect();
  db = client.db("JuniPix");
  galleryCollection = db.collection("gallery");
}
connectToDatabase().catch(console.dir);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

app.post(
  "/register",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  }
);

app.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "lax",
        httpOnly: true,
      });
      res.status(200).json({ status: "Connected", message: "Connected!" });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Error logging in user" });
    }
  }
);

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.get("/profile", verifyToken, (req, res) => {
  res.status(200).json(req.user);
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { maxAge: 0, sameSite: "lax", httpOnly: true });
  res.status(200).json({ message: "Disconnected" });
});

app.get("/likes", async (req, res) => {
  try {
    const galleries = await galleryCollection.find().toArray();
    res.json(galleries);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/galleries", async (req, res) => {
  try {
    const galleries = await galleryCollection.find().toArray();
    res.json(galleries);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/gallery/:id/images", async (req, res) => {
  try {
    const galleryId = req.params.id;
    const gallery = await galleryCollection.findOne({
      _id: new ObjectId(galleryId),
    });
    if (!gallery) {
      return res.status(404).send("Gallery not found");
    }
    res.json(gallery.images);
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/likes", async (req, res) => {
  try {
    const newGallery = req.body;
    const result = await galleryCollection.insertOne(newGallery);
    res.json(result.ops[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/likes/:id", async (req, res) => {
  try {
    const galleryId = req.params.id;
    const artpiece = req.body.artpiece;

    const result = await galleryCollection.updateOne(
      { _id: new ObjectId(galleryId) },
      { $push: { artpieces: artpiece } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send("Gallery not found");
    }

    res.send("Art piece added successfully");
  } catch (error) {
    console.error("Error adding art piece:", error);
    res.status(500).send(error);
  }
});

app.put("/likes/:id", async (req, res) => {
  try {
    const galleryId = req.params.id;
    const artpiece = req.body.artpiece;

    const result = await galleryCollection.updateOne(
      { _id: new ObjectId(galleryId) },
      { $push: { artpieces: artpiece } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send("Gallery not found");
    }

    res.send("Art piece added successfully");
  } catch (error) {
    console.error("Error adding art piece:", error);
    res.status(500).send(error);
  }
});

app.get("/likes/:id", async (req, res) => {
  try {
    const galleryId = req.params.id;
    const gallery = await galleryCollection.findOne({
      _id: new ObjectId(galleryId),
    });

    if (!gallery) {
      return res.status(404).send("Gallery not found");
    }

    res.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).send(error);
  }
});

app.delete("/likes/:id", async (req, res) => {
  try {
    const galleryId = req.params.id;
    const result = await galleryCollection.deleteOne({
      _id: new ObjectId(galleryId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).send("Gallery not found");
    }

    res.send("Gallery deleted successfully");
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
