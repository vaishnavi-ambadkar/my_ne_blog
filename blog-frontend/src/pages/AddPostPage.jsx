
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function AddPostPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const editingPost = location.state?.post;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setDescription(editingPost.description);
      setImage(null); // Optional: Keep image upload separate
    }
  }, [editingPost]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      if (editingPost) {
        // Update the existing post
        const response = await axios.put(
          `http://localhost:5000/api/posts/${editingPost._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        setMessage("Post updated successfully!");
      } else {
        // Add a new post
        const response = await axios.post(
          "http://localhost:5000/api/posts",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        setMessage("Post submitted successfully!");
      }
  
      // Reset form fields after successful submission
      setTitle("");
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error("Error submitting post:", error);
      setMessage("Error submitting post. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="add-post-page">
      <div className="form-container">
        <h2>{editingPost ? "Edit Blog Post" : "Add a New Blog Post"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {image && (
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
              Selected Image: {image.name}
            </p>
          )}

          <textarea
            placeholder="Enter Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : editingPost ? "Update Post" : "Submit Post"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              color: message.startsWith("Error") ? "red" : "green",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddPostPage;
