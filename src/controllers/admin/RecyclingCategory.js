const { RecyclingCategory } = require("../../database/models");

const getAllRecyclingCategory = async (req, res) => {
  try {
    const data = await RecyclingCategory.findAll();

    res.send({ error: false, message: "success", data: data });
  } catch (error) {
    res.send({
      message: "something went wrong while getting categories",
      error: error,
    });
  }
};

const createRecyclingCategory = async (req, res) => {
  //get image
  if (req.file) {
    const avatar = req.file;
    console.log("icon", avatar.filename);

    const data = req.body;
    const newData = {
      icon: avatar.filename,
      name: data.name,
    };
    try {
      await RecyclingCategory.create(newData);
      res.status(200).send({ success: true });
    } catch (error) {
      res.send({ success: false });
    }
  }
};

const getRecyclingCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await RecyclingCategory.findOne({
      where: { id: parseInt(id) },
    });

    res.send({ success: true, data: category });
  } catch (error) {
    res.send({ success: false });
  }
};

const updateRecyclingCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const category = await RecyclingCategory.findOne({ where: { id: id } });

    await category.update(data);
    await category.save();

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
};

const deleteRecyclingCategory = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const results = await RecyclingCategory.findOne({
      where: { id: parseInt(id) },
    });
    await results.destroy();
    res.send({ success: true, message: "delete successfully" });
  } catch (error) {
    res.send({
      message: "something went wrong whiles deleting resoucre",
      error: true,
    });
  }
};

module.exports.RecyclingCategoryController = {
  getAllRecyclingCategory,
  createRecyclingCategory,
  getRecyclingCategory,
  updateRecyclingCategory,
  deleteRecyclingCategory,
};
