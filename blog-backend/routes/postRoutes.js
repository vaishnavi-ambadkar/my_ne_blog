// const express = require('express');
// const multer = require('multer');
// const cloudinary = require('../config/cloudinary');
// const Post = require('../models/Post');

// const router = express.Router();

// // Configure Multer for file upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // @route POST /api/posts
// // @desc  Create a new blog post
// router.post('/add', upload.single('image'), async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         if (!req.file) {
//             return res.status(400).json({ error: 'Image file is required' });
//         }

//         // Upload image to Cloudinary
//         const uploadResponse = await cloudinary.uploader.upload_stream(
//             { folder: 'blog_images' },
//             async (error, result) => {
//                 if (error) {
//                     console.error('Cloudinary Upload Error:', error);
//                     return res.status(500).json({ error: 'Image upload failed' });
//                 }

//                 // Save post to MongoDB
//                 const newPost = new Post({
//                     title,
//                     description,
//                     imageUrl: result.secure_url,
//                 });

//                 await newPost.save();
//                 res.status(201).json({ message: 'Post created successfully', post: newPost });
//             }
//         );

//         uploadResponse.end(req.file.buffer);
//     } catch (error) {
//         console.error('Error creating post:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// // @route GET /api/posts
// // @desc  Get all blog posts
// router.get('/', async (req, res) => {
//     try {
//         const posts = await Post.find().sort({ createdAt: -1 });
//         res.json(posts);
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// module.exports = router;

// const express = require('express');
// const multer = require('multer');
// const cloudinary = require('../config/cloudinary');
// const Post = require('../models/Post');

// const router = express.Router();

// // Configure Multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // @route POST /api/posts/add
// // @desc  Create a new blog post
// router.post('/add', upload.single('image'), async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         if (!req.file) {
//             return res.status(400).json({ error: 'Image file is required' });
//         }

//         // Upload image to Cloudinary
//         cloudinary.uploader.upload_stream(
//             { folder: 'blog_images' },
//             async (error, result) => {
//                 if (error) {
//                     console.error('Cloudinary Upload Error:', error);
//                     return res.status(500).json({ error: 'Image upload failed' });
//                 }

//                 // Save post to MongoDB
//                 const newPost = new Post({
//                     title,
//                     description,
//                     imageUrl: result.secure_url,
//                 });

//                 await newPost.save();
//                 res.status(201).json({ message: 'Post created successfully', post: newPost });
//             }
//         ).end(req.file.buffer);

//     } catch (error) {
//         console.error('Error creating post:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// // @route GET /api/posts
// // @desc  Get all blog posts
// router.get('/', async (req, res) => {
//     try {
//         const posts = await Post.find().sort({ createdAt: -1 });
//         res.json(posts);
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// module.exports = router;

// const express = require('express');
// const multer = require('multer');
// const cloudinary = require('../config/cloudinary');
// const Post = require('../models/Post');

// const router = express.Router();

// // Configure Multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // @route POST /api/posts/add
// // @desc  Create a new blog post
// router.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     if (!req.file) {
//       return res.status(400).json({ error: 'Image file is required' });
//     }

//     // Upload image to Cloudinary
//     cloudinary.uploader.upload_stream(
//       { folder: 'blog_images' },
//       async (error, result) => {
//         if (error) {
//           console.error('Cloudinary Upload Error:', error);
//           return res.status(500).json({ error: 'Image upload failed' });
//         }

//         // Save post to MongoDB
//         const newPost = new Post({
//           title,
//           description,
//           imageUrl: result.secure_url,
//         });

//         await newPost.save();
//         res.status(201).json({ message: 'Post created successfully', post: newPost });
//       }
//     ).end(req.file.buffer);

//   } catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // @route GET /api/posts
// // @desc  Get all blog posts
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // @route PUT /api/posts/:id
// // @desc  Update a blog post
// router.put('/:id', async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const updatedData = { title, description };

//     // If a new image is uploaded
//     if (req.files?.image) {
//       const uploadResult = await cloudinary.uploader.upload(req.files.image.tempFilePath);
//       updatedData.imageUrl = uploadResult.secure_url;
//     }

//     const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     res.status(200).json({ message: 'Post updated successfully!', post: updatedPost });
//   } catch (error) {
//     console.error('Error updating post:', error);
//     res.status(500).json({ error: 'Failed to update the post' });
//   }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post');

// // Create a new post
// router.post('/', async (req, res) => {
//   const cloudinary = req.cloudinary; // Access Cloudinary from the request object

//   try {
//     const { title, description } = req.body;
//     let imageUrl = null;

//     if (req.files && req.files.image) {
//       const file = req.files.image;
//       const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
//       imageUrl = uploadResult.secure_url; // Uploaded image URL
//     }

//     const newPost = await Post.create({
//       title,
//       description,
//       imageUrl,
//     });

//     res.status(200).json({ message: 'Post created successfully!', post: newPost });
//   } catch (err) {
//     console.error('Error creating post:', err);
//     res.status(500).json({ message: 'Error creating post', error: err });
//   }
// });

// // Fetch all posts
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find(); // Fetch all posts from MongoDB
//     res.status(200).json(posts);
//   } catch (err) {
//     console.error('Error fetching posts:', err);
//     res.status(500).json({ message: 'Error fetching posts', error: err });
//   }
// });

// // Update a post
// router.put('/:id', async (req, res) => {
//   const cloudinary = req.cloudinary; // Access Cloudinary from the request object

//   try {
//     const { title, description } = req.body;
//     const updatedData = { title, description };

//     // Check if a new image is uploaded
//     if (req.files?.image) {
//       const uploadResult = await cloudinary.uploader.upload(req.files.image.tempFilePath);
//       updatedData.imageUrl = uploadResult.secure_url;
//     }

//     const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     res.status(200).json({ message: 'Post updated successfully!', post: updatedPost });
//   } catch (err) {
//     console.error('Error updating post:', err);
//     res.status(500).json({ error: 'Failed to update the post' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new post
router.post('/', async (req, res) => {
  const cloudinary = req.cloudinary; // Access Cloudinary from the request object

  try {
    const { title, description } = req.body;
    let imageUrl = null;

    if (req.files && req.files.image) {
      const file = req.files.image;
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
      imageUrl = uploadResult.secure_url; // Uploaded image URL
    }

    const newPost = await Post.create({
      title,
      description,
      imageUrl,
    });

    res.status(200).json({ message: 'Post created successfully!', post: newPost });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Error creating post', error: err });
  }
});

// Fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from MongoDB
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  const cloudinary = req.cloudinary; // Access Cloudinary from the request object

  try {
    const { title, description } = req.body;
    const updatedData = { title, description };

    // Check if a new image is uploaded
    if (req.files?.image) {
      const uploadResult = await cloudinary.uploader.upload(req.files.image.tempFilePath);
      updatedData.imageUrl = uploadResult.secure_url;
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json({ message: 'Post updated successfully!', post: updatedPost });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update the post' });
  }
});

// DELETE a post (added)
router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    
    const deletedPost = await Post.findByIdAndDelete(postId);
    
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Error deleting post', error: err });
  }
});

module.exports = router;
