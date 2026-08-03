//Import the prepared app from app.ts
import app from "./app";

import dotenv from 'dotenv'
dotenv.config()



const PORT = process.env.PORT || 8000

//start application
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})