import express  from "express";
import cors from "cors";

import authRoutes from './routes/authRoutes'
import checkInRoutes from './routes/checkInRoutes'
import { check } from "zod";

//creates express application
const app = express();  

//Configure middlewares
app.use(cors());
app.use(express.json());

//Register routes
app.get("/", (req, res) => {
    res.json({
        message: "Inventra API is running",
    })
})

app.use('/api/auth', authRoutes)
//Checkin Routes
app.use("/api/checkIn", checkInRoutes)
app.use('/api/checkIn/today', checkInRoutes)




export default app;