import express from "express";
// import { User } from "../models/user.model.js";
import { getMyProfile, logout, login, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// GetApi:
// router.get("/home", getAllUsers)


// PostApi:
// router.post("/users/new", createUser)
// export default router;


// register/login:

router.post("/new", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/me", isAuthenticated, getMyProfile)

export default router