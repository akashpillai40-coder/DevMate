import express  from "express";
import cors from "cors";

import authRoutes from './routes/authRoutes'
import checkInRoutes from './routes/checkInRoutes'
import summaryRoutes from './routes/checkInRoutes'

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
//CheckIn Routes
app.use("/api/checkIn", checkInRoutes)
app.use('/api/checkIn/today', checkInRoutes)
//Summary Routes
app.use("/api/summary", summaryRoutes )







export default app;