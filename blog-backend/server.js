// const express = require('express');
// const mongoose = require('mongoose');
// const fileUpload = require('express-fileupload');
// const cors = require('cors');
// const cloudinary = require('cloudinary').v2;
// const postRoutes = require('./routes/postRoutes');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors()); 
// app.use(express.json());
// app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: 'dar0bjrax', // Replace with your actual Cloudinary cloud name
//   api_key: '176993643569666', // Replace with your actual API key
//   api_secret: '_2IWSycsEs6u6qUIwGgVEsdc6Q0', // Replace with your actual API secret
// });
// console.log('Cloudinary configured successfully!');

// // MongoDB connection
// mongoose.connect('mongodb+srv://ambadkarvaishnavi667:Sunitaambadkar@signup.q9zwd.mongodb.net/blogit?retryWrites=true&w=majority&appName=signup', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));


// // Routes
// app.use('/api/posts', (req, res, next) => {
//   req.cloudinary = cloudinary; // Attach Cloudinary to the request object
//   next();
// }, postRoutes);

// // DELETE route to handle deleting a blog post by ID
// app.delete('/api/posts/:id', async (req, res) => {
//   try {
//     const postId = req.params.id;

//     // Attempt to delete the post by ID
//     const deletedPost = await Post.findByIdAndDelete(postId);

//     if (!deletedPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     // Return a success message if deleted
//     res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
//   } catch (err) {
//     console.error('Error deleting post:', err);
//     res.status(500).json({ message: 'Error deleting post', error: err });
//   }
// });
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log('Cloudinary configured successfully!');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/posts', (req, res, next) => {
  req.cloudinary = cloudinary; // Attach Cloudinary to the request object
  next();
}, postRoutes);

// DELETE route to handle deleting a blog post by ID
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Attempt to delete the post by ID
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return a success message if deleted
    res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Error deleting post', error: err });
  }
});
app.get("/",(req,res)=>{
  res.json("Hello");
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
