const { HomeCategory } = require("../database/models");

const getHomeCategories = async (req, res) => {
  try {
    const data = await HomeCategory.findAll();

    res.send({
      error: false,
      message: "success",
      data: data,
    });
  } catch (error) {
    res.send({ error: true, message: "soomthing went wrong" });
  }
};

const HomeController = {
  getHomeCategories,
};

module.exports = HomeController;
