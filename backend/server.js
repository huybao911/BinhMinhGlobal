const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
require("colors");

const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const isAuth = require("./middleware/is-admin");
const User = require("./models/User");
const Product = require("./models/Product");


const db = require("./config/db");

const app = express();

dotenv.config({ path: "./config/config.env" });

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_HOST,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storages = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "SanPham",
        format: async () => "jpg",
        public_id: (req, file) => file.filename
    },
})

if (process.env.NODE_ENV === "production") console.log = function () { };

if (process.env.NODE_ENV === "development") app.use(logger("dev"));

app.use(cors());

// DB Connection
db(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Upload 
app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.use(express.static(path.join('public/images')));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storages });
app.post("/api/v1/admin/addProduct", upload.single("image"), isAuth, async (req, res) => {
    const { nameProduct, typeProduct, price, productDetail, productDescription } = req.body;
    try {
        if (!req.admin) return res.status(400).send("You dont have permission");
        if (!nameProduct || !typeProduct || !price || !productDetail || !productDescription)
            return res.status(400).send("Please fill in all the required fields!")
        const newProduct = new Product({
            nameProduct,
            typeProduct,
            price,
            productDetail,
            productDescription,
            image: req.file.path,
        });
        await newProduct.save();

        return res
            .status(200)
            .json(newProduct)
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

app.put("/api/v1/admin/product/:id", upload.single("image"), isAuth, async (req, res) => {
    const { id } = req.params;

    const { nameProduct, price, productDetail, productDescription } = req.body;
    try {
        if (!req.admin) return res.status(400).send("You dont have permission");
        const product = await Product.findById(id).lean();
        if (!product) return res.status(400).send("Product does not exist");
        if (req.file) {
            const productObj = {
                nameProduct: nameProduct,
                price: price,
                productDetail: productDetail,
                productDescription: productDescription,
                image: req.file.path,
            };
            const newProduct = await Product.findByIdAndUpdate(
                { _id: id },
                {
                    nameProduct: productObj.nameProduct,
                    price: productObj.price,
                    productDetail: productObj.productDetail,
                    productDescription: productObj.productDescription,
                    image: productObj.image,
                },
                { new: true }
            );
            return res.status(200).json(newProduct);
        }
        else {
            const productObj = {
                nameProduct: nameProduct,
                price: price,
                productDetail: productDetail,
                productDescription: productDescription,
            };
            const newProduct = await Product.findByIdAndUpdate(
                { _id: id },
                {
                    nameProduct: productObj.nameProduct,
                    price: productObj.price,
                    productDetail: productObj.productDetail,
                    productDescription: productObj.productDescription,
                },
                { new: true }
            );
            return res.status(200).json(newProduct);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }

});

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/admin", require("./routes/admin"));

module.exports = app;