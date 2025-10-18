import express from "express"
import dotenv from "dotenv"
const app = express()
dotenv.config()

const PORT = process.env.PORT


app.get("/",(req,res)=>{
    return res.json({msg:"Welcome to the red chat"})
})


app.listen(PORT , ()=>{
    console.log(`Server is running on the PORT number ${PORT}`)
})