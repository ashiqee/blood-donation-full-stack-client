import { Button, InputLabel, TextField } from "@mui/material";
import HTMLReactParser from "html-react-parser";
import JoditEditor from "jodit-react";
import { useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";

const image_hosting = import.meta.env.VITE_IMAGE_HOST;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

const AddNewBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [blogImg, setBlogImg] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const handleBlogImgUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const { display_url } = data.data;
          console.log("Cover Image uploaded successfully:", display_url);
          setBlogImg(display_url);
        } else {
          console.error("Image upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    }
  };

  const handleAddBlogPost = async () => {
    const date = new Date();
    const blogData = {
      title: title,
      author: user?.displayName,
      blogImg: blogImg,
      blogContent: content,
      date: date,
      blogStatus: "draft",
    };

    const res = await axiosSecure.post("/addBlog", blogData);
    if (res.data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `add blog post Successful`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/content-management");
    }
  };
  return (
    <div className=" mx-auto p-10">
      <div>
        <div>
          <h2 className="text-2xl">Add new blog post</h2>
        </div>
        <div className="flex gap-10 mb-10">
          <div className="w-full">
            <InputLabel>Title of the blog</InputLabel>
            <TextField
              type="text"
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className="font-bold w-full text-black"
            />
          </div>
          <div className="w-full">
            <TextField
              type="file"
              id="img"
              onChange={handleBlogImgUpload}
              name="img"
            />
          </div>
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />

        <div className="text-right mt-5">
          <Button onClick={handleAddBlogPost} variant="contained">
            Add Blog Post
          </Button>
        </div>
      </div>
      <div className="mt-20 text-2xl"> {title}</div>
      <img src={blogImg} alt="" />
      <div>{HTMLReactParser(content)}</div>
    </div>
  );
};

export default AddNewBlog;
