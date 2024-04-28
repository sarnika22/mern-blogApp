import classes from "./styles.module.css";

export default function AddNewBlog() {
  return (
    <div className={classes.wrapper}>
      <h1>Add a blog</h1>
      <div className={classes.formWrapper}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter blog title"
        />
        <textarea
          name="description"
          id="description"
          placeholder="enter description"
        />
        <button>Add new Blog</button>
      </div>
    </div>
  );
}
