require('dotenv').config({path:'vars.env'});
const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const cartRoute = require("./routes/cartRoute")
const emailRoute = require("./routes/emailRoute")

const server = express();
server.use(cors());
server.use(express.json());

server.use("/rep-api/auth", authRoute);
server.use("/rep-api/user", userRoute);
server.use("/rep-api/product", productRoute);
server.use("/rep-api/cart", cartRoute)
server.use("/rep-api/email", emailRoute)


server.listen(process.env.PORT, () => {
    console.log(`Server running at: http://localhost:${process.env.PORT}`);
});
