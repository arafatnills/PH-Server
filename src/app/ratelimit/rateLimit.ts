import rateLimit from "express-rate-limit";

export const loginRateLimit = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message:
      "You have tried too many times. Please try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


export const resendOtpRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many OTP requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});