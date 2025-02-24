const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ error: "Missing user or password" });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.status(401).json({ error: "Unauthorized line 16" });
  }
  //evalute the password
  console.log("FOUND USER🟢", foundUser._id);
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    const userId = foundUser._id;
    //create JWTs
    const accessToken = jwt.sign(
      {
        _id: userId,
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "12h" }
    );
    //saving the refresh token with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log("From authCon line 46", result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });
    // secure: true,
    
    // include user ID
    res.json({ accessToken, userId: userId});
    // res.status(200).json({ success: `Welcome ${user}!` });
  } else {
    res.status(401).json({ error: "Unauthorized line 29" });
  }
};

module.exports = { handleLogin };
