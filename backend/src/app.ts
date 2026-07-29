import express  from "express";
import cors from "cors";

import authRoutes from './routes/authRoutes'

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




export default app;