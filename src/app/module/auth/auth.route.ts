import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { loginRateLimit, resendOtpRateLimit } from "../../ratelimit/rateLimit";
import { AuthController } from "./auth.controller";
import { UserValidation } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidation.PatientRegistrationZodSchema),
  AuthController.registerPatient,
);
router.post(
  "/verify-email",
  validateRequest(UserValidation.PatientEmailVerifyZodSchema),
  AuthController.verifyPatientEmail,
);
// resent registration otp
router.post(
  "/resend-otp",
  resendOtpRateLimit, // IP-based limit, see below
  validateRequest(UserValidation.ResendOtpZodSchema),
  AuthController.resendRegistrationOtp,
);

router.post(
  "/login",
  loginRateLimit,
  validateRequest(UserValidation.LoginZodSchema),
  AuthController.loginUser,
);
router.get(
  "/me",
  auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  // validateRequest
  AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
router.post(
  "/forgot-password",
  validateRequest(UserValidation.ForgotPasswordZodSchema),
  AuthController.forgotPassword,
);
router.post(
  "/reset-password",
  validateRequest(UserValidation.ResetPasswordZodSchema),
  AuthController.resetPassword,
);
router.post("/logout", AuthController.logout);

export const AuthRoutes = router;
