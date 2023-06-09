const router = require("express").Router();
const AuthController = require("../controllers/AuthController")

//router.use(bodyParser.json());

router.post("/register", AuthController.registerUser);

router.post('/login', AuthController.loginUser);

router.post("/check-email", AuthController.checkEmail);

router.post("/reset-password", AuthController.modifyPassword);

module.exports = router;