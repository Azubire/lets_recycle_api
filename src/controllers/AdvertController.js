const { Advert, RecyclingCategory, User } = require("../database/models");
const { Op } = require("sequelize");
const getAdverts = async (req, res) => {
  try {
    //newestAds
    const newestAds = await Advert.findAll({
      exclude: ["weight", "updatedAt"],
      order: [["updatedAt", "DESC"]],
      include: [
        { model: RecyclingCategory },
        { model: User, attributes: ["name", "id", "profileImg"] },
      ],
    });

    //bestSelling
    const bestSellingAds = await Advert.findAll({
      exclude: ["weight", "updatedAt"],
      where: { status: "complete" },
      order: [["updatedAt", "DESC"]],
      include: [
        { model: RecyclingCategory },
        { model: User, attributes: ["name", "id", "profileImg"] },
      ],
    });

    //topAds
    const topAds = await Advert.findAll({
      exclude: ["weight", "updatedAt"],
      where: {
        status: {
          [Op.ne]: "rejected",
          [Op.ne]: "complete",
        },
      },
      order: [["updatedAt", "DESC"]],
      include: [
        { model: RecyclingCategory },
        { model: User, attributes: ["name", "id", "profileImg"] },
      ],
    });

    // console.log(topAds);
    const responseData = {
      newestAds,
      bestSellingAds,
      topAds,
    };
    res.send({ error: false, message: "success", data: responseData });
  } catch (error) {
    res.send({ error: error, message: "something went wrong" });
    // console.log(error);
  }
};

//create
const create = async (req, res) => {
  const newData = {
    title: req.body.title,
    description: req.body.description,
    adImage: req.file.filename,
    price: req.body.price,
    weight: req.body.weight,
    status: "pending",
    userId: req.body.userId,
    categoryId: req.body.categoryId,
  };

  try {
    await Advert.create(newData);

    res.send({ error: false, message: "success" });
  } catch (error) {
    res.send({ error: true, message: "failed" });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Advert.findOne({ where: { id: id } });
    res.send({ error: false, message: "success", data: data });
  } catch (error) {
    res.send({ error: true, message: "failed" });
  }
};

const update = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  try {
    const data = await Advert.findOne({ where: { id: id } });

    await data.update(body);
    await data.save();
    res.send({ error: false, message: "sucsess" });
  } catch (error) {
    res.send({ error: true, message: "failed" });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Advert.findOne({ where: { id: id } });
    await data.destroy();
    res.send({ error: false, messahe: "deleted succesfully" });
  } catch (error) {
    res.send({ error: true, message: "something went wrong" });
  }
};

module.exports = { getAdverts, show, update, destroy, create };
