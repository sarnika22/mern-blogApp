import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

export default function AddNewBlog() {
  const { formdata, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSaveBlogToDatabase() {
    const response = isEdit
      ? await axios.put(
          `http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
          {
            title: formdata.title,
            description: formdata.description,
          }
        )
      : await axios.post("http://localhost:5000/api/blogs/add", {
          title: formdata.title,
          description: formdata.description,
        });
    const result = await response.data;
    console.log(result);
    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, [location]);

  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit Blog" : "Add New Blog"}</h1>
      <div className={classes.formWrapper}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter blog title"
          value={formdata.title}
          onChange={(event) =>
            setFormData({ ...formdata, title: event.target.value })
          }
        />
        <textarea
          name="description"
          id="description"
          placeholder="enter description"
          value={formdata.description}
          onChange={(event) =>
            setFormData({ ...formdata, description: event.target.value })
          }
        />
        <button onClick={handleSaveBlogToDatabase}>
          {isEdit ? "Edit Blog" : "Add New Blog"}
        </button>
      </div>
    </div>
  );
}
