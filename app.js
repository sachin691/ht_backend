require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require('./routes/paymentRoutes');

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(passport.initialize());
app.use(cors());


app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api', paymentRoutes);

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});
