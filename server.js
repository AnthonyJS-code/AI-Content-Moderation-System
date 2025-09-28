require("dotenv").config()
const express = require("express")
const connectDB = require("./db")
const processed = require("./Routes/process")
const app = express()
port = process.env.PORT


app.use(express.static("static"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.post("/api/process",processed)

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("Server Started at port",port)
    })
})