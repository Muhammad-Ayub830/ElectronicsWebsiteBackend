const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
// sign up
const signUp = async (req,res)=>{
        const {username,password,email} = req.body;
        if(!username || !password || !email){
              return res.status(500).json({success:false,message:"Credentials messing"})
        }
        const isUserExist = await User.findOne({username})
        if(isUserExist){
                return res.status(500).json({success:false,message:"Username not available"})
        }

    try {
        const newUser = await User.create({
            username,
            password,
            email
        })
        const token = await jwt.sign(
            { userId : newUser._id,role:newUser.role},process.env.jwt_secret)
        
     await   res.cookie("token",token,{
            maxAge : 7*24*60*60*1000,
            sameSite :'none',
            secure : true,
            httpOnly: true
        })
        const path = newUser.role == 'admin' ? '/admin' : '/placeOrder'
     return res.status(201).json({success:true,message:"Signed Up",redirect:path})

    } catch (error) {
        console.log('hello')
            return res.status(500).json({success:false,message:error.message})

    }
}

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
            { userId: userr._id, role: userr.role },
            process.env.jwt_secret
        );

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000
});
    const path = userr.role == 'admin' ? '/admin' : '/placeOrder';
        return res.status(200).json({ message: "Logged In!",redirect:path });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
};

// checking authroization
const auth = async (req,res)=>{
    console.log(req.user)
    return res.status(200).json({message:"Authenicated",status:true ,role:req.user.role})
}
const authcustomer = async (req,res)=>{
    console.log(req.user)
    return res.status(200).json({message:"Authenicated",status:true ,role:req.user.role})
}

// log out
const logout = async (req,res)=>{
    try {
          res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none"
})
    return res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log(error)
    }
  
}

module.exports = { login,auth,logout,signUp,authcustomer };