const express = require("express");
const {createBlog,deleteBlog,updateBlog,allBlogs,blogById,addComment,deleteComment,updateComment,like,dislike} = require("../controllers/blogController");

const router = express.Router();
//blog
router.post("/blog/createBlog", createBlog);
router.delete("/blog/deleteBlog/:id", deleteBlog);
router.put("/blog/updateBlog/:id", updateBlog);
router.get("/blog/allBlogs",allBlogs);
router.get("/blog/blogById/:id", blogById);

//comments
router.put("/blog/:id/comments/",addComment)
router.put('/blog/:id/comments/:cid',deleteComment);
router.put('/blog/:id/comments/:cid/edit',updateComment);

//likes and dislikes
router.put("/blog/:id/like",like);
router.put("/blog/:id/dislike",dislike);

module.exports = router;