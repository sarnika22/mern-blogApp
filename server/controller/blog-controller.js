const mongoose = require("mongoose");
const Blog = require("../modal/blog");
const blog = require("../modal/blog");

//fetch list of blogs
//add delete update blog

const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await blog.find();
  } catch (error) {
    console.log(error);
  }

  if (!blogList) {
    return res.status(404).json({ message: "No blogs found" });
  }
  return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blog({
    title,
    description,
    date: currentDate,
  });

  try {
    await newlyCreatedBlog.save();
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save(session);
    session.commitTransaction();
  } catch (error) {
    return res.send(500).json({ message: error });
  }

  return res.status(200).json({ newlyCreatedBlog });
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unable to Delete! Please try again" });
  }
};

const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let currentBlogToUpdate;

  try {
    currentBlogToUpdate = await blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (error) {
    console.log(error);
    res
      .send(500)
      .json({ message: "Something went wrong while Updating! Try Again" });
  }

  if (!currentBlogToUpdate) {
    return res
      .status(404)
      .json({ message: "Unable to Update! Please try again" });
  }
  return res.status(200).json({ currentBlogToUpdate });
};

module.exports = {
  fetchListOfBlogs,
  addNewBlog,
  deleteBlog,
  updateBlog,
};
