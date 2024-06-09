const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000;

const uri = `${process.env.REACT_APP_AUTH}`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

let db, galleryCollection;

async function connectToDatabase() {
  await client.connect();
  db = client.db("JuniPix");
  galleryCollection = db.collection("gallery");
}

connectToDatabase().catch(console.dir);

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
    const gallery = await Gallery.findById(galleryId);
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

    console.log(
      `Received request to add art piece to gallery with ID: ${galleryId}`
    );
    console.log("Art piece:", artpiece);

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

    console.log(
      `Received request to add art piece to gallery with ID: ${galleryId}`
    );
    console.log("Art piece:", artpiece);

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

// Route pour supprimer une galerie spécifique
app.delete("/likes/:id", async (req, res) => {
  try {
    const galleryId = req.params.id;
    console.log(`Attempting to delete gallery with ID: ${galleryId}`);
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
