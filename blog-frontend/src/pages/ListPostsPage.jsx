
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${postId}`
      );
      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== postId));
        alert("Post deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
  };

  const handleEdit = (post) => {
    navigate("/add-post", { state: { post } });
  };

  return (
    <div
      className="list-posts-page"
      style={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: "20px",
        transition: "background-color 0.3s ease",
      }}
    >
      <div style={{ width: "80%", maxWidth: "1000px", margin: "0 auto" }}>
        <h2>All Blog Posts</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {posts.map((post) => (
            <li
              className="post-item"
              key={post._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                background: "linear-gradient(to bottom, #2c93a1, #0d68a0)", // Updated gradient background
                color: "white", // Text color for readability
                transition: "background-color 0.3s ease",
              }}
            >
              <div>
                <h3 style={{ margin: "0 0 5px 0" }}>{post.title}</h3>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                )}
                <p style={{ margin: 0, color: "#f0f0f0", fontSize: "14px" }}>
                  {post.description}
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEdit(post)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#5a189a")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#007bff")
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#5a189a")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#dc3545")
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListPostsPage;
