const express = require("express");
const { connection } = require("./db/db");

const {userRouter} = require("./routes/user.route")
const cors = require("cors")
const {notesRouter} = require("./routes/notes.route");
const { auth } = require("./middleware/auth");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("homepage")
})

app.use("/user",userRouter);
//app.use(auth)
app.use("/note",auth,notesRouter)

app.listen(process.env.PORT, async()=>{
    try {
        await connection;
        console.log("connection to db is successful")

    } catch (error) {
        console.log("error in connection to db")
    }
    console.log(`listening to PORT ${process.env.PORT}`)
})