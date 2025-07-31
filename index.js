import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"

const app = express()


app.use(bodyParser.json())

const connectionString = 'mongodb+srv://admin:1216@cluster0.jkk1ekx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to database")
    }
).catch(
    ()=>{
        console.log("Failed to connect to the database")
    }
)

app.get("/" , 
    (req,res)=>{
        console.log(req)
        res.json(
            {
                message : "This is a get request"
            }
        )   
        console.log("This is a get request")
    }
)


app.post("/", 

    (req ,res)=>{

        console.log(req.body)
        res.json(
            {
                message : "This is a post request"
            }
        )
        console.log("This is a post request")
    }
)



app.listen(5000, 
   ()=>{
       console.log("server started")
   }
)
