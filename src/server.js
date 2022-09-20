require("dotenv").config();
const cors = require("cors");
const {
  User,
  Recycler,
  RecyclingCategory,
  Notification,
} = require("./database/models");
const express = require("express");

// Notification.sync({ alter: true });
const app = express();
app.use(cors());

const HomeRouter = require("./routes");
const UserRouter = require("./routes/User");
const AuthRouter = require("./routes/Auth");
const { sequelize } = require("./database/models");

//admin
const CategoryRouter = require("./routes/admin/HomeCategory");
const RecyclerRouter = require("./routes/admin/Recyclers");
const Notificationrouter = require("./routes/Notifications");
const AdvertRouter = require("./routes/Advert");
const RequestRouter = require("./routes/Requests");

app.use(express.json());
app.use(express.static("public"));
// app.get("/public")
app.use("/", HomeRouter);
app.use("/users", UserRouter);
app.use("/auth", AuthRouter);
app.use("/notifications", Notificationrouter);
app.use("/adverts", AdvertRouter);
app.use("/Requests", RequestRouter);

//admin
app.use("/admin", CategoryRouter);
app.use("/recyclers", RecyclerRouter);
app.get("/recycler/status/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: "Recycler",
    });

    // const recycler = user.getRecycler();
    res.send({ error: false, data: user });
  } catch (error) {
    res.send({ error: true, data: error });
    console.log(error);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected ssuccessfully !");
  } catch (error) {
    console.error("Unable to connect to database", error);
  }

  console.log(`Servers listening on port ${port}`);
});
