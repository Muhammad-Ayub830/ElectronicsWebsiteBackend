const jwt = require("jsonwebtoken")

// admin auth middleware
const authmiddleware = async (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"Unauthorized!"})
    }
    try {
        const decoded  = jwt.verify(token,process.env.jwt_secret)
       
        if(decoded.role == 'admin'){
 req.user = decoded
  return next()
        }
        else{
            
             return res.status(403).json({ message: "Forbidden: Admins only", role:decoded.role });
        }
               

    } catch (error) {
                return res.status(401).json({message:"Unauthorized!" ,error:error})

    }
}

// customer auth middleware

const customerAuthMiddleware = async (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
          return res.status(401).json({message:"Unauthorized!"})
    }
    try{
         const decoded = await jwt.verify(token,process.env.jwt_secret)
    req.user = decoded;
    next()
    }
    catch (error) {
                return res.status(401).json({message:"Unauthorized!"})

    }
}

module.exports = {authmiddleware,customerAuthMiddleware};