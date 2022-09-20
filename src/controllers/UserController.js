const {
  User,
  Advert,
  RecyclingCategory,
  Notification,
  Recycler,
} = require("../database/models");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      // name: req.body.name,
      // email: req.body.email,
      // password: req.body.password,
    });

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    console.log("user", user);
    const newUser = await user.getAdverts({
      attributes: [
        "id",
        "title",
        "description",
        "status",
        "adImage",
        "createdAt",
      ],
    });
    // const recyclerStatus = await user.getRecycler({
    //   attributes: ["isVerified"],
    // });

    res.send({
      error: false,
      message: "success",
      data: { user: newUser },
    });
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: "something went wrong!" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const file = req.file;
  const image = file.filename;
  // console.log(image);
  try {
    const user = await User.findOne({ where: { id: userId } });

    const newImage = await user.update({ profileImg: image });
    return res.send({
      error: false,
      message: "success",
      image: newImage.profileImg,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { id: id } });
    return res.json({ message: "user deleted successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const getMetrics = async (req, res) => {
  try {
    //users
    const users = await User.findAndCountAll();
    //recycler
    const recyclers = await Recycler.findAndCountAll();
    // adverts
    const adverts = await Advert.findAndCountAll();
    //recycling cat
    const recyclingcategories = await RecyclingCategory.findAndCountAll();
    // notifications
    const notifications = await Notification.findAndCountAll();
    const data = {
      users: users.count,
      recyclers: recyclers.count,
      adverts: adverts.count,
      recyclingcategories: recyclingcategories.count,
      notifications: notifications.count,
    };
    res.send({ error: false, message: "success", data });
  } catch (error) {
    console.log(error);
    res.send({ error: true, message: "failed" });
  }
};

const UserController = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMetrics,
};

module.exports = UserController;
