require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const user = require("./routes/user");
const complain = require("./routes/complain");
const db = require("./utils/db.config");
const errorHandler = require("./middleware/errorhandle");

const app = express();
var corsOptions = {
  origin: 'https://complaintlodgeriitr.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
db();
app.use(express.json());

app.use("/auth", auth);//login or signup route
app.use("/user", user);
//keep collections for private and public complains as different considering security

//commenting out this part since this has already been implemented in controller part
//app.use('/:id/private',privateComplain);//req.params.id
app.use("/complain", complain);

app.use(errorHandler);

const PORT = process.env.PORT || 55000;
app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);