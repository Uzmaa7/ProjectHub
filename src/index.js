import app from "./app.js";
import dotenv from "dotenv";
import connectdb from "./db/dbConnect.js";


dotenv.config({
    path: "./.env"
})



const port = process.env.PORT || 8000;

connectdb()
.then(() => {
    app.listen(port, (req, res) => {
        console.log(`app is listening on port ${port}`)
    })
})
.catch((error) => {
    console.error("Mongodb connection error", error);
})

