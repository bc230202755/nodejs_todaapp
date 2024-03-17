import express from "express"
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
config({
    path: "./data/config.env"
});

const app = express();
//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

// Using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter)

export default app;