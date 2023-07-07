const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const TypeProduct = require("../models/TypeProduct");
const Product = require("../models/Product");
const City = require("../models/City");
const Cart = require("../models/Cart");

exports.register = async (req, res, next) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    const userObj = { username, role };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    let getRole = await Role.findById(userObj.role);

    const token = sign({ user, getRole }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(200)
      .json(getRole.keyRole === "user" ? { token, user: { ...user._doc, password: null  }, getRole } : { token, admin: { ...user._doc, password: null }, getRole } )

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
    let getRole = await Role.findById(user.role);

    if (!user) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "user")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user, getRole }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null }, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { password, resetPass, confirmPass } = req.body;
  const user = await User.findById(req?.user?._id).populate("role");
  if ( !password || !resetPass)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const isMatchPass = await compare(confirmPass, user.password);
    if (!isMatchPass) return res.status(400).send("Mật khẩu cũ không trùng khớp");
    const hashedPwd = await hash(password, 12);
    const passwordObj = {
      password: hashedPwd,
    };
    const isMatch = await compare(resetPass, passwordObj.password);
    if (!isMatch) return res.status(400).send("Mật khẩu không trùng khớp");
    const newPass = await User.findByIdAndUpdate(
      { _id: user._id },
      { password: passwordObj.password },
      { new: true }
    );
    return res.status(200).json(newPass);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getCitys = async (req, res, next) => {
  try {
    return res.status(200).json(await City.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    return res.status(200).json(await Cart.find().lean().populate("city"));
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.addCart = async (req, res) => {
  const { fullName, nameCompany, address, city, sdt, email, product, note, date } = req.body;
  try {
    if (!fullName || !nameCompany || !address || !city || !sdt || !email || !product || !date) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    const cartObj = {
      product: product,
      fullName: fullName,
      nameCompany: nameCompany,
      address: address,
      city: city,
      sdt: sdt,
      email: email,
      note: note,
      date: date,
    };
    const newCart = new Cart({
      product: cartObj.product,
      fullName: cartObj.fullName,
      nameCompany: cartObj.nameCompany,
      address: cartObj.address,
      city: cartObj.city,
      sdt: cartObj.sdt,
      email: cartObj.email,
      note: cartObj.note,
      date: cartObj.date,
    });
    await newCart.save();
    return res.status(200).json(newCart);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};


exports.getTypeProduct = async (req, res, next) => {
  try {
    return res.status(200).json(await TypeProduct.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    return res.status(200).json(await Product.find().lean().populate("typeProduct"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    let getRole = await Role.findById(user.role);
    let getDepartment = await Department.findById(user.department);
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ user: { ...user }, getRole, getDepartment });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};