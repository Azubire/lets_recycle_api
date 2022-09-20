const { Notification, Request, User, Recycler } = require("../database/models");

const getNotifications = async (req, res) => {
  try {
    const data = await Notification.findAll({
      attributes: ["id", "body", "title", "status", "avatar"],
      include: [
        { model: User, attributes: ["name"] },
        { model: Recycler, attributes: ["companyName"] },
      ],
    });

    res.send({ erro: false, message: "success", data: data });
  } catch (error) {
    res.send({
      error: true,
      message: "something went wrong while fetching notification",
    });
  }
};
const getUserNotifications = async (req, res) => {
  try {
    const data = await Notification.findAll({
      where: { RecyclerId: req.params.id },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "body", "title", "status", "avatar", "userId"],
    });
    res.send({ erro: false, message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.send({
      error: true,
      message: "something went wrong while fetching notification",
    });
  }
};

const create = async (req, res) => {
  // const advert = Advert.find({where:{id:req.body.adId}})

  try {
    const newNotification = {
      title: `Message from ${req.body.name} `,
      body: req.body.message,
      userId: req.body.userId,
      avatar: req.body.img,
      RecyclerId: req.body.sellerId,
      status: 0,
    };
    const newRequest = {
      userId: req.body.userId,
      adId: req.body.adId,
      status: 0,
    };

    const data = await Notification.create(newNotification);
    const request = await Request.create(newRequest);

    res.send({ error: false, message: "success" });
  } catch (error) {
    res.send({ error: true, message: "failed" });
  }
};

const update = async (req, res) => {
  try {
    const data = await Notification.findOne({ where: { id: req.params.id } });
    const updated = await data.update({ status: 1 });
    res.send({ error: false, message: "success" });
  } catch (error) {
    res.send({ error: true, message: "failed" });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Notification.findOne({ where: { id: id } });
    await data.destroy();
    res.send({ error: false, message: "success" });
  } catch (error) {
    res.send({ error: true, message: "something went wrong " });
  }
};

module.exports = {
  getNotifications,
  getUserNotifications,
  destroy,
  create,
  update,
};
