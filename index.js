const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const NewsRoute = require("./routes/postnews");

const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const moment = require("moment");
const Twig = require("twig"),
  twig = Twig.twig;
let lastUpdated = 0;
let start = moment(lastUpdated, "HH:mm");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cors());
// const cors = require("cors");

// // enable cors
// app.use(
//   cors({
//     origin: true,
//     optionsSuccessStatus: 200,
//     credentials: true,
//   })
// );
// app.options(
//   "*",
//   cors({
//     origin: true,
//     optionsSuccessStatus: 200,
//     credentials: true,
//   })
// );

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

// home route
app.get("/", (req, res) => {
  let time = moment().diff(start, "minutes");
  res.render("index.twig", { time });
});
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(
    "mongodb+srv://admin:admin123@ecommerce.72jni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/news", NewsRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Backend is running.");
});
