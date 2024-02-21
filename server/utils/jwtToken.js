const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwtGenerate = (user_id) =>{
    const payload = {
        id:user_id
    }

    const token  = jwt.sign(payload,process.env.secret,{expiresIn:"1h"})

    return token
}
module.exports = {jwtGenerate}