import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body
  try {
    if (!isLength(name, { min: 3, max: 20 })) {
      return res.status(422).send("Name must be 3-20 characters long");
    } else if (!isLength(password, { min: 8 })) {
      return res.status(422).send("Password must be at least 8 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }
    const user = await User.findOne({ email })
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    await new Cart({ user: newUser._id }).save();
    const token = jwt.sign({ userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' });
    res.status(201).json(token);
  } catch {
    console.error(error)
    res.status(500).send("Server error while signing up user.  Please try again later.");
  }
}