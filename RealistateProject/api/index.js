import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js"
import cookieParser from "cookie-parser";


mongoose
  .connect("mongodb://localhost:27017", {
    // dbName: 'test',
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to mongodb!!");
  })
  .catch((err) => {
    console.log("error:", err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3003, () => {
  console.log("server is running on port 3003!!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing",listingRouter);




app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});