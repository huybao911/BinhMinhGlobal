const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const City = require("../models/City");
const TypeProduct = require("../models/TypeProduct");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ username }).lean();

    let getRole = await Role.findById(admin.role);

    if (!admin) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "admin")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ admin, getRole }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, admin, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.addRole = async (req, res) => {
  const { nameRole, keyRole } = req.body;
  try {
    if (!nameRole || !keyRole) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    // if (!req.admin) {
    //   return res.status(400).send("You dont have permission");
    // }
    const roleObj = { nameRole, keyRole }
    const role = await new Role(roleObj).save();
    return res
      .status(201)
      .json(role)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await User.find().populate("role"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json([await User.findOne().populate("role")]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getRoles = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await Role.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("User does not exist");
    const userObj = { ...req.body };
    if (req.body.password) {
      const hashedPWD = await hash(req.body.password, 12);
      userObj.password = hashedPWD;
    }
    const newUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...userObj },
      { new: true }
    );
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const deleteUser = await User.deleteOne({ _id: id });
    return res.status(200).send("User has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getTypeProduct = async (req, res, next) => {
  if (!req.admin) return res.status(400).send("You dont have permission");
  try {
    return res.status(200).json(await TypeProduct.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addTypeProduct = async (req, res) => {
  const { nameTypeProduct } = req.body;
  try {
    if (!nameTypeProduct) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    if (!req.admin) {
      return res.status(400).send("You dont have permission");
    }
    const typeProductObj = { nameTypeProduct }
    const typeProduct = await new TypeProduct(typeProductObj).save();
    return res
      .status(201)
      .json(typeProduct)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.updateTypeProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const typeProduct = await TypeProduct.findById(id).lean();
    if (!typeProduct) return res.status(400).send("TypeProduct does not exist");
    const typeProductObj = { ...req.body };
    const newTypeProduct = await TypeProduct.findByIdAndUpdate(
      { _id: id },
      { ...typeProductObj },
      { new: true }
    );
    return res.status(200).json(newTypeProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteTypeProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    await TypeProduct.deleteOne({ _id: id });
    return res.status(200).send("TypeProduct has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getProduct = async (req, res, next) => {
  if (!req.admin) return res.status(400).send("You dont have permission");
  try {
    return res.status(200).json(await Product.find().lean().populate("typeProduct"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addProduct = async (req, res) => {
  const { nameProduct, typeProduct, price, productDetail, productDescription } = req.body;
  try {
    if (!nameProduct || !typeProduct || !price || !productDetail || !productDescription) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    if (!req.admin) {
      return res.status(400).send("You dont have permission");
    }
    const productObj = { nameProduct, typeProduct, price, productDetail, productDescription }
    const product = await new Product(productObj).save();
    return res
      .status(201)
      .json(product)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const product = await Product.findById(id).lean();
    if (!product) return res.status(400).send("Product does not exist");
    const productObj = { ...req.body };
    const newProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { ...productObj },
      { new: true }
    );
    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    await Product.deleteOne({ _id: id });
    return res.status(200).send("Product has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCart = async (req, res, next) => {
  if (!req.admin) return res.status(400).send("You dont have permission");
  try {
    return res.status(200).json(await Cart.find().lean().populate("city"));
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.addCart = async (req, res) => {
  const { fullName, nameCompany, address, city, sdt, email, product, note } = req.body;
  if (!req.admin) return res.status(400).send("You dont have permission");
  try {
    if (!fullName || !nameCompany || !address || !city || !sdt || !email || !product) {
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
    });
    await newCart.save();
    return res.status(200).json(newCart);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteCart = async (req, res) => {
  const { id } = req.params;
  if (!req.admin) return res.status(400).send("You dont have permission");
  try {
    await Cart.deleteOne({ _id: id });
    return res.status(200).send("Cart has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCitys = async (req, res, next) => {
  if (!req.admin) return res.status(400).send("You dont have permission");
  try {
    return res.status(200).json(await City.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addCity = async (req, res) => {
  const { nameCity } = req.body;
  try {
    if (!nameCity) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    if (!req.admin) {
      return res.status(400).send("You dont have permission");
    }
    const cityObj = { nameCity }
    const city = await new City(cityObj).save();
    return res
      .status(201)
      .json(city)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.updateCity = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const city = await City.findById(id).lean();
    if (!city) return res.status(400).send("City does not exist");
    const cityObj = { ...req.body };
    const newCity = await City.findByIdAndUpdate(
      { _id: id },
      { ...cityObj },
      { new: true }
    );
    return res.status(200).json(newCity);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteCity = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    await City.deleteOne({ _id: id });
    return res.status(200).send("City has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthAdmin = async (req, res, next) => {
  try {
    const admin = await User.findById(req?.admin?._id).select("-password").lean();
    let getRole = await Role.findById(admin.role);
    if (!admin)
      return res.status(400).send("Admin not found, Authorization denied..");
    return res.status(200).json({ admin: { ...admin }, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
