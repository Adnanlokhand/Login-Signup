const { route } = require("../routes/jwtAuth")

const validInfo = (req,res,next) =>{
    const isEmailValid = (email) =>{
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const result = pattern.test(email)
        return result
    }

    if (req.path == "/register"){
        const {name,email,password} = req.body
        if(!email || !password || !name){
            return res.status(401).json("Misssing Credential")
        }else if(!isEmailValid(email)){
            return res.status(401).json("Invalid Email")
        }
        next()
    }
    if (req.path == "/login"){
        const {email,password} = req.body
        if(!email || !password){
            return res.status(401).json("Misssing Credential")
        }else if(!isEmailValid(email)){
            return res.status(401).json("Invalid Email")
        }
        next()
    }


}

module.exports = validInfo