import { useContext } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";

export default function AddNewBlog() {
  const {formdata, setFormData} = useContext(GlobalContext);

  console.log(formdata);

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
        <button>Add new Blog</button>
      </div>
    </div>
  );
}
