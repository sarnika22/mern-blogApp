const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect(`mongodb+srv://Sarnika:Sharu@cluster-0.nzsqxch.mongodb.net/`)
  .then(() => console.log("Connected MongoDB"))
  .catch((e) => console.log(e))
 