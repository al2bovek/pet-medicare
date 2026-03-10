import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  userExists,
  emailExists,
  saveRefreshToken,
  findUserByRefreshToken,
  removeRefreshToken
} from "../queries/userQueries.js";


const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES }
  );
};


const setRefreshCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
};


export const register = async (req, res, next) => {
  try {
    const { user_name, email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUserName = user_name.trim();

    if (await userExists(normalizedUserName)) {
      return res.status(409).json({ message: "Username already registered" });
    }

    if (await emailExists(normalizedEmail)) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await argon2.hash(password);

    const user = await createUser({
      user_name: normalizedUserName,
      email: normalizedEmail,
      password: hashedPassword,
      role: "client"
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await saveRefreshToken(user.id, refreshToken);
    setRefreshCookie(res, refreshToken);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        role: user.role
      },
      accessToken
    });

  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await findUserByEmail(email.trim().toLowerCase());
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const valid = await argon2.verify(user.password, password);
    if (!valid)
      return res.status(401).json({ message: "Invalid email or password" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await saveRefreshToken(user.id, refreshToken);
    setRefreshCookie(res, refreshToken);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        role: user.role
      },
      accessToken
    });

  } catch (err) {
    next(err);
  }
};


export const refresh = async (req, res, next) => {
  try {
    const oldToken = req.cookies?.refreshToken;
    if (!oldToken) return res.sendStatus(401);

    let decoded;
    try {
      decoded = jwt.verify(oldToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await findUserByRefreshToken(oldToken);
    if (!user) return res.sendStatus(403);

    const newRefreshToken = generateRefreshToken(user);
    await saveRefreshToken(user.id, newRefreshToken);
    setRefreshCookie(res, newRefreshToken);

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    next(err);
  }
};


export const logout = async (req, res, next) => {
  try {
    await removeRefreshToken(req.user.id);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    res.json({ message: "Logged out successfully" });

  } catch (err) {
    next(err);
  }
};
