mongoose
  .connect("mongodb://localhost:27017/StudentOnlineREport", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection is sucessful");
  })
  .catch((e) => console.log("No connection"));
