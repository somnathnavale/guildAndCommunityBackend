const express = require("express");
const Blog = require("../models/blogModel");
const router = express.Router();

const createBlog = async (req, res) => {
  try {
    const { title, author, description, tags, comments } = req.body;
    const newBlog = new Blog({
      title,
      author,
      description,
      tags,
      comments,
    });
    const newPost = await newBlog.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
};
//delete blog

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Blog.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ message: "No blog with given id" });
    }
    res.status(200).json({ message: "blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update blog

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Blog.findById(id);
    if (!result) {
      return res
        .status(400)
        .json({ message: "Couldn't found blog with given id" });
    }
    const { title, author, description, likes, tags, comments } = req.body;
    const update = { title, author, description, likes, tags, comments };
    const updatedBlog = await Blog.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json({ message: "blog has updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//read all blogs

const allBlogs = async (req, res) => {
  try {
    const result = await Blog.find({});
    res.send(result);
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

//read blog by id

const blogById = async (req, res) => {
  const { id } = req.params;
  const result = await Blog.findById(id);
  if (!result) {
    return res
      .status(400)
      .json({ message: "couldn't found blog with given id" });
  }
  res.status(200).json(result);
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const result = await Blog.findById(id);
  if (!result) {
    return res
      .status(400)
      .json({ message: "couldn't found blog with given id" });
  } else {
    const { user, comment } = req.body;
    const commentBody = { user, comment };
    result.comments.push(commentBody);
    await result.save();
    res.json("comment addded succefully");
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const result = await Blog.findById(id);

  if (!result) {
    return res
      .status(400)
      .json({ message: "couldn't found blog with given id" });
  } else {
    const { cid } = req.params;
    await result.comments.pull({ _id: cid });
    await result.save();
    res.send(result);
  }
};

//update comment
const updateComment = async (req, res) => {
  const { id, cid } = req.params;
  const result = await Blog.findById(id);
  const { comment } = req.body;
  if (!result) {
    return res
      .status(400)
      .json({ message: "couldn't found blog with given id" });
  } else {
    const result = await Blog.updateOne(
      { _id: id, "comments._id": cid },
      {
        $set: {
          "comments.$.comment": comment,
        },
      }
    );
    res.send(result);
  }
};

const like = async (req, res) => {
  const { id } = req.params;
  const result = await Blog.findById(id);
  if (!result) {
    return res
      .status(400)
      .json({ message: "couldn't found blog with given id" });
  } else {
    result.likes=result.likes+1;
    await result.save();
    res.send(result)
  }
};

const dislike = async (req, res) => {
  const { id } = req.params;
  const result = await Blog.findById(id);
  if (!result) {
    return res
      .status(400)
      .json({ message: "couldn't found blog with given id" });
  } else {
    result.likes=result.likes-1;
    await result.save();
    res.send(result)
  }
};

module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  allBlogs,
  blogById,
  addComment,
  deleteComment,
  updateComment,
  like,
  dislike
};
