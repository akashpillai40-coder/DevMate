import express  from "express";
import cors from "cors";

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



export default app;