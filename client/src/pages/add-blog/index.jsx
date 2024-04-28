import { useContext } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
export default function AddNewBlog() {
  const { formdata, setFormData } = useContext(GlobalContext);

  console.log(formdata);

  async function handleSaveBlogToDatabase() {
    const response = await axios.post("http://localhost:5000/api/blogs/add", {
      title: formdata.title,
      description: formdata.description,
    });
    const result = await response.data;
    console.log(result);
  }

  return (
    <div className={classes.wrapper}>
      <h1>Add a blog</h1>
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
        <button onClick={handleSaveBlogToDatabase}> Add new Blog</button>
      </div>
    </div>
  );
}
