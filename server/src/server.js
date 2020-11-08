require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const authority = require('./routes/authority');
const admin = require('./routes/admin');
const student = require("./routes/student");
const complain = require("./routes/complain");
const db = require("./utils/db.config");
const Verify = require('./middleware/auth');
const errorHandler = require("./middleware/errorhandle");

const app = express();

db();
app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/student", student);
app.use("/authority",authority);
app.use('/admin',admin);
app.use("/complain", complain);

app.use(Verify);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;
app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);