import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

/**
 * Asynchronously registers a new user.
 *
 * @param {Request} req - The request object containing user data.
 * @param {Response} res - The response object to send back the result.
 * @return {Promise<void>} Resolves with a success message or rejects
 *                        with an error message.
 */
const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ message: "User with that username already exists." });
      return;
    }

    user = new User({ username, password });
    await user.save();

    const payload = {
      user: {
        id: user.id,
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

/**
 * Authenticates a user login by checking the username and password against
 * the database.
 *
 * @param {Request} req - The request object containing username and password.
 * @param {Response} res - The response object to send back the result.
 * @return {Promise<void>} Resolves with a JWT token if login is successful,
 *                        or rejects with an error message if login fails.
 */
const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const payload = {
      user: {
        id: user.id,
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    res.status(400).json({ error: 'Login failed' });
  }
};

export { register, login };
