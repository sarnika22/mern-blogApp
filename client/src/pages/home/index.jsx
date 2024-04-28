import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    }
    console.log(result);
  }

  useEffect(() => {
    fetchListOfBlogs();
  });

  return (
    <div >
      <h1>Blog List</h1>
      {pending ? (
        <h1> Loading blogs! Please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList.map((blogItem) => (
            <div key={blogItem._id}>
              <p>{blogItem.title}</p>
              <p>{blogItem.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
