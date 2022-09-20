const { Recycler, RecyclingCategory, Role } = require("../../database/models");

const getRecyclers = async (req, res) => {
  try {
    const data = await Recycler.findAll({
      include: {
        model: RecyclingCategory,
        attributes: ["id", "name", "icon"],
      },
    });
    // const nd = await data.getRecyclingCategory();
    console.log("nd", data);

    res.send({ error: false, message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.send({ error: true, message: "something went wrong", data: error });
  }
};

const create = async (req, res) => {
  const image = req.file;
  // console.log(req.body);
  // res.send({ error: false, data: req.body });

  try {
    const recycler = await Recycler.create({
      companyName: req.body.companyName,
      about: req.body.about,
      profile: req.body.profile,
      location: req.body.location,
      workingHours: req.body.workingHours,
      profileImg: image.filename,
      isVerified: 1,
      userId: req.body.userId,
      recyclingCatId: req.body.recyclingCatId,
    });

    res.send({ error: false, message: "successs", data: recycler });
  } catch (error) {
    console.log(error);
    res.send({ error: true, message: "something went wrong", errorr: error });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Recycler.findOne({ where: { id: id } });
    await data.destroy();
    res.send({ error: false, message: "deleted successfully" });
  } catch (error) {
    res.send({
      error: true,
      message: "something went wrong while deleting resource",
    });
  }
};

module.exports = { getRecyclers, destroy, create };
