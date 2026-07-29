//Import the prepared app from app.ts
import app from "./app";


const PORT = process.env.PORT || 5000

//start application
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})