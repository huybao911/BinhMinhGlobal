const { Router } = require("express");

const isAuth = require("../middleware/is-admin");
const adminController = require("../controllers/admin");

const router = Router({ strict: true });

router.post("/login", adminController.login);
router.get("/auth-admin", isAuth, adminController.getAuthAdmin);
router.get("/users", isAuth, adminController.getUsers);
router.get("/user", isAuth, adminController.getUser);

router.get("/roles", isAuth, adminController.getRoles);
router.post("/addRole", adminController.addRole);

router.get("/citys", isAuth,adminController.getCitys);
router.post("/addCity", isAuth, adminController.addCity);
router.patch("/city/:id", isAuth, adminController.updateCity);
router.delete("/city/:id", isAuth, adminController.deleteCity);

router.get("/typeProduct", isAuth,adminController.getTypeProduct);
router.post("/addTypeProduct", isAuth, adminController.addTypeProduct);
router.patch("/typeProduct/:id", isAuth, adminController.updateTypeProduct);
router.delete("/typeProduct/:id", isAuth, adminController.deleteTypeProduct);

router.get("/product", isAuth,adminController.getProduct);
router.post("/addProduct", isAuth, adminController.addProduct);
router.put("/product/:id", isAuth, adminController.updateProduct);
router.delete("/product/:id", isAuth, adminController.deleteProduct);

router.get("/cart", isAuth,adminController.getCart);
router.post("/addCart", isAuth,adminController.addCart);
router.delete("/cart/:id", isAuth,adminController.deleteCart);

router
  .route("/users/:id")
  .patch(isAuth, adminController.updateUser)
  .delete(isAuth, adminController.deleteUser);

module.exports = router;
