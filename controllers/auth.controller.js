const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// login
const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "credentials missing!" });
        }

        const userr = await User.findOne({ username: username });
        if (!userr) {
            return res.status(400).json({ message: "username or password is incorrect" });
        }

        if (password !== userr.password) {
            return res.status(400).json({ message: "username or password is incorrect" });
        }

        // password is correct
        const token = jwt.sign(
            { userId: userr._id },
            process.env.jwt_secret
        );

      res.cookie("token", token, {
    httpOnly: true,
    secure: true,       // HTTPS only
    sameSite: "none",   // MUST be string "none"
    maxAge: 7*24*60*60*1000
});
        return res.status(200).json({ message: "Logged In!" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
};

// checking authroization
const auth = async (req,res)=>{
    return res.status(200).json({message:"Authenicated",status:true})
}
// log out
const logout = async (req,res)=>{
    try {
          res.clearCookie("token")
    return res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log(error)
    }
  
}

module.exports = { login,auth,logout };