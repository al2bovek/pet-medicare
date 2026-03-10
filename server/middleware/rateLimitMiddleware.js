import { rateLimit, ipKeyGenerator } from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" },
  keyGenerator: (req) => {
    if (req.user?.id) return `user:${req.user.id}`;

    return `ip:${ipKeyGenerator(req)}`;

  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts, try again later" },
  skipSuccessfulRequests: true,

  keyGenerator: ipKeyGenerator,

  handler: (req, res) => {
    console.warn(`Auth rate limit hit by IP: ${req.ip}`);
    res.status(429).json({ message: "Too many attempts, try again later" });
  }
});
