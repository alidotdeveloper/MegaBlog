const express = require("express");
const cors = require("cors");
const sdk = require("node-appwrite");
const { Client } = require("appwrite");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const appwriteClient = new sdk.Client();
appwriteClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("657c886c4b12d971d7")
  .setKey(
    "987174ad407c63d787708f4e8e75079b51a745df1c6207d469f5e531908ec06a5de70e350ac840a0c3a39c466ca4983677410160ed7e38d6cd79887ad2478187a9526b65958c66036ec0b28e5bcc21810e9ba319e55a4c325cdb9c09ae778bdebf7b069ee551e9df5930a9e47eeaf3c81ba0842c91f539c40d7d9c46f98f0b05"
  );

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await appwriteClient.database.listDocuments(
      "657c89409e291365ef8e",
      "657c891b0065fa7a6a86"
    );
    res.json(posts.documents);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Appwrite server is running on http://localhost:${PORT}`);
});
