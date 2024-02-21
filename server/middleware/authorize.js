const jwt = require("jsonwebtoken")
require("dotenv").config()

const authorize = (req,res,next) => {
    const jwtToken = req.header("token")
    // console.log(jwtToken)
    try {
        if(!jwtToken){
            return res.status(403).json("Not authorized")
        }
        
        const payload = jwt.verify(jwtToken,process.env.secret)
        
        req.user = payload.id
        next()

    } catch (error) {
        // console.log(error.message)
        res.status(401).json("Not Authorized")
    }



}
module.exports = authorize