const express = require("express");
const app = express();
require("dotenv/config")

const cors = require("cors");
//mongodb
const {default : mongoose} = require("mongoose");

app.use(cors({origin : true}));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json("hai there...")
})

//điều hướng api cho post man (gọi api)
//user authenticantion Routes
const useRoute = require("./routes/auth");
//"/api/users/" là phần đường dẫn trc khi vào chức năng api
app.use("/api/users/", useRoute);

//Artsit Routes
const artsitRoutes = require("./routes/artist");
app.use("/api/artists/", artsitRoutes);

//Albums Routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums/", albumRoutes);

//Songs Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs/", songRoutes);


//active mongodb
mongoose.connect(process.env.DB_STRING, {useNewUrlParser : true});
mongoose.connection
.once("open", () => console.log("Connected"))
.on("error", (error) => {
    console.log(`ERROR : ${error}`);
} )

app.listen(4000, () => console.log("Listening to port 4000"));