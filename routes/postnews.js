const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/News");

//CREATE POST
router.post("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const post = await Post.findById(req.params.id);

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const post = await Post.findById(req.params.id);

    try {
      await post.delete();
      res.status(200).json("Post has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    let posts;

    posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
