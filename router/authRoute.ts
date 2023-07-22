import express,{Router} from "express"
import { upload } from "../config/multer";
import { createUser, deleteUser, signInUser, updateOneUser, viewOneUser, viewUser } from "../controller/authController";

const router: Router = express.Router();

router.route("/sign-in").post(signInUser);
router.route("/sign-up").post(upload, createUser)
router.route("/users").get(viewUser);
router.route("/:userID/user-detail").get(viewOneUser);
router.route("/:userID/update-user").patch(updateOneUser);
router.route("/:userID/delete-user").delete(deleteUser)

export default router;