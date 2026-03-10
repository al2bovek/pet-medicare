import UserModel from "../models/userModel.js";

import {
  findUserById,
  getAllUsersQuery
} from "../queries/userQueries.js";


export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(UserModel.public(user));
  } catch (error) {
    next(error);
  }
};


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersQuery();
    res.json(UserModel.publicList(users));
  } catch (error) {
    next(error);
  }
};
