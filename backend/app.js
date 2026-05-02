const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const userRouter = require("./routes/user.routes");
const uploadRouter = require("./routes/upload.routes");
const postRouter = require("./routes/post.routes");

//connect to database
connectDB();

const app = express();

app.use(express.json());

app.use(cors({origin: process.env.FRONTEND_URL || "*"}));

//routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", userRouter);

app.use("/api/upload", uploadRouter);
app.use("/api/post", postRouter);



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
