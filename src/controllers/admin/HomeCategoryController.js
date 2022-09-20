const { HomeCategory, Advert, User } = require("../../database/models");

const getAllHomeCategories = async (req, res) => {
  try {
    const data = await HomeCategory.findAll();

    res.send({ error: false, message: "success", data: data });
  } catch (error) {
    res.send({
      message: "something went wrong while getting categories",
      error: true,
    });
  }
};

const getAdverts = async (req, res) => {
  try {
    const data = await Advert.findAll({
      order: [["updatedAt", "DESC"]],
      include: [{ model: User, attributes: ["name"] }],
    });
    res.send({ error: false, message: "sucess", data: data });
  } catch (error) {
    console.log(error);
    res.send({ error: true, message: "failed" });
  }
};

const createHomeCategory = async (req, res) => {
  //get image
  if (req.file) {
    const avatar = req.file;
    console.log("avatar", avatar.filename);

    const data = req.body;
    const newData = {
      icon: avatar.filename,
      title: data.title,
      screen: data.screen,
    };
    try {
      await HomeCategory.create(newData);
      res.status(200).send({ success: true });
    } catch (error) {
      res.send({ success: false });
    }
  }
};

const getHomeCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await HomeCategory.findOne({
      where: { id: parseInt(id) },
    });

    res.send({ success: true, data: category });
  } catch (error) {
    res.send({ success: false });
  }
};

const updateHomeCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const category = await HomeCategory.findOne({ where: { id: id } });

    await category.update(data);
    await category.save();

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
};

const deleteHomeCategory = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const results = await HomeCategory.findOne({ where: { id: parseInt(id) } });
    await results.destroy();
    res.send({ success: true, message: "delete successfully" });
  } catch (error) {
    res.send({
      message: "something went wrong whiles deleting resoucre",
      error: true,
    });
  }
};

module.exports.HomeCategoryController = {
  getAllHomeCategories,
  createHomeCategory,
  getHomeCategory,
  updateHomeCategory,
  deleteHomeCategory,
  getAdverts,
};
