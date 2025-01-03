import express from "express";
import { registerUser, loginUser, changePassword, userLogout, uploadProfilePic, uploadCoverImage, verifyEmail, validateToken, getUserDetails, updateProfile } from '../../controllers/v1/user.controller.js'
import verifyToken from "../../middlewares/verifyToken.middleware.js";
import { handleValidationErrors, userRegisterValidation, userLoginValidation, changePasswordValidation }
  from "../../middlewares/validation.middleware.js"
import multerUpload from '../../middlewares/multer.middleware.js'



// TODO: add a neccessary express validations (rida)
const router = express.Router()

/*
  API Endpoint:  /api/v1/user/register
*/
router.post("/register",
  userRegisterValidation(),
  handleValidationErrors,
  registerUser)


/*
  API Endpoint:  /api/v1/user/login
*/
router.post("/login",
  userLoginValidation(),
  handleValidationErrors,
  loginUser)


/*
  API Endpoint:  /api/v1/user/changepassword
*/
router.post("/changepassword",
  verifyToken,
  changePasswordValidation(),
  handleValidationErrors,
  changePassword)

/*
  API Endpoint:  /api/v1/user/updateprofile
*/
router.post("/updateprofile",
  verifyToken,
  handleValidationErrors,
  updateProfile)


router.get("/logout", verifyToken, userLogout)

/*
  API Endpoint:  /api/v1/user/details/:username
*/
router.get("/details/:username",
  verifyToken,
  getUserDetails
)

router.post("/auth/validate", validateToken)

//email verification
router.get("/verify-email/:token", verifyEmail)


router.post("/uploadProfilePic",
  verifyToken,
  multerUpload.single('profile'),
  uploadProfilePic
)

router.post("/uploadCoverPic",
  verifyToken,
  multerUpload.single('cover'),
  uploadCoverImage
)

//TODO: get other user data by username

export default router;