const bcrypt = require("bcrypt");
const User = require("../Models/User");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "username already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getusers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json({ status: true, users });
  } catch (ex) {
    next(ex);
  }
};
