import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).send("server error");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(400).send("wrong credentials");

    const validated = await bcrypt.compare(req.body.password, user.password);

    const { password, ...others } = user._doc;

    if (validated) {
      res.status(200).json(others);
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send('Wrong credentials')
  }
};
