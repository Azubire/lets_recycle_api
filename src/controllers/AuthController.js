const Joi = require("joi");
const { User } = require("../database/models");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");

// user registration
const userSignup = async (req, res) => {
  // const { firstName, lastName, emai, email } = req.body;

  // const schema = Joi.object({
  //   firstName: Joi.string().required(),
  //   lastName: Joi.string().required(),
  //   phone: Joi.number().required(),
  //   email: Joi.string().email().min(3).max(100).required(),
  //   password: Joi.string().required().min(6),
  //   confirmPassword: Joi.ref("password"),
  // });
  // const { error, value } = schema.validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  try {
    const emailExist = await User.findOne({ where: { email: req.body.email } });

    if (emailExist)
      return res.json({
        error: true,
        message: "user already exist",
        data: {
          userToken: "",
          profile: {
            userName: "",
            email: "",
            coverImg: "",
            profileImg: "",
          },
        },
      });

    const user = await User.create({
      name: `${req.body.lastName
        .split(" ")
        .join("")
        .toString()
        .toLowerCase()} ${req.body.firstName
        .split(" ")
        .join("")
        .toString()
        .toLowerCase()}`,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
    });

    return res.json({
      error: false,
      message: "Sign up succesfull",
      data: {
        userToken: "fakeusertoken",
        profile: {
          userName: user.name,
          email: user.email,
          coverImg: "",
          profileImg: "",
        },
      },
    });
  } catch (error) {
    return res.send({
      error: true,
      message: "something went wrong try again !",
      data: {
        userToken: "",
        profile: {
          userName: "",
          email: "",
          coverImg: "",
          profileImg: "",
        },
      },
    });
  }
};

// user signin
const userSignin = async (req, res) => {
  const { email, password } = req.body;

  // const schema = Joi.object({
  //   email: Joi.string().email().required(),
  //   password: Joi.string().required(),
  // });

  // const { error, value } = schema.validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ where: { email: email } });
  if (!user)
    return res.send({ error: true, message: "invalid password or email" });

  const verifiedUser = await bcrypt.compare(password, user.password);
  if (!verifiedUser)
    return res.send({ error: true, message: "invalid password or email" });

  //JWT token
  const token = Jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return res.header({ Authorization: `${token}` }).send({
    error: false,
    message: "sign in successful",
    data: {
      userToken: token,
      profile: {
        id: user.id,
        userName: user.name,
        email: user.email,
        coverImg: user.coverImg,
        profileImg: user.profileImg,
      },
    },
  });
};

//recycler signup
const recyclerSignup = (req, res) => {};

//admin signup
//delete later
const adminSignup = (req, res) => {};

// admin sign in
const adminSignin = (req, res) => {};

const verifyTokenFromAsyncStorage = async (req, res) => {
  // get token from request
  // const token = req.headers.authorization.split(" ")[1];

  const token = req.get("authorization").split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: true, message: "invalid token" });
  }
  try {
    const verifiedToken = Jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifiedToken);
    const user = await User.findOne({ where: { email: req.body.email } });

    if (verifiedToken && user) {
      //JWT token
      const token = Jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.send({
        error: false,
        message: "sign in successful",
        data: {
          userToken: token,
          profile: {
            id: user.id,
            userName: user.name,
            email: user.email,
            coverImg: user.coverImg,
            profileImg: user.profileImg,
          },
        },
      });
    }
  } catch (error) {
    res.send({ error: true, message: "something went wrong" });
  }
};

const AuthController = {
  userSignup,
  userSignin,
  adminSignup,
  adminSignin,
  verifyTokenFromAsyncStorage,
};

module.exports = AuthController;
