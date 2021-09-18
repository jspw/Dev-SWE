import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Container from "@mui/material/Container";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function Feed() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("blog/all")
      .then((blogs) => {
        console.log(blogs.data);
        setBlogs(blogs.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full">
      <div className=" text-2xl font-semibold text-blue-500 mb-4  w-full bg-white">
        Blogs
      </div>

      {blogs.map((blog) => (
        <Card key={blog.id} className="m-2 p-4">
          <Container key={blog.id} style={{ alignItems: "start" }}>
            <div style={{ display: "flex", justifyContent: "start" }}>
              <div style={{ padding: "10px" }}>
                <img
                  width="30px"
                  height="30px"
                  style={{ borderRadius: "50%" }}
                  src="https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=248&fit=crop&auto=format"
                />
              </div>
              <div>
                <Link
                  className="p-2 text-sm text-green-500"
                  to={`/user/${blog.user.username}`}
                >
                  {blog.user.username}
                </Link>

                <div style={{ padding: "5px", fontSize: "10px" }}>
                  {blog.createdAt}
                </div>
              </div>
            </div>
            <div className="ml-4 flex flex-col">
              <Link to={`/blog/${blog.title}`}>{blog.title}</Link>
              <a className="text-purple-500" href={blog.category.name}>
                #{blog.category.name}
              </a>
              <div style={{ display: "flex" }}>
                <div style={{ paddingRight: "20px" }}>
                  <FavoriteIcon color="success" /> {blog.reacts.length} reacts{" "}
                </div>
                <div style={{ paddingRight: "5px" }}>
                  <CommentIcon color="info" /> {blog.comments.length} comments
                </div>
              </div>
            </div>
          </Container>
        </Card>
      ))}
    </div>
  );
}
