import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User with that username already exists." });
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

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
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
