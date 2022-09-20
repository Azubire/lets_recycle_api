const { Request } = require("../database/models");

const getRequests = async (req, res) => {
  try {
    const data = await Request.findAll();
    res.send({ error: false, mesage: "success", data: data });
  } catch (error) {
    res.send({ error: true, message: "failed" });
  }
};

module.exports = { getRequests };
