const pool = require("../db");
const bcrypt = require("bcrypt")
const router = require("express").Router();
const {jwtGenerate} = require("../utils/jwtToken")
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");
router.post("/register",validInfo,async (req,res) => {
    try {
        //1 . Destructure the request body 

        const {name , email , password} = req.body
        
        //2 Check whether user exits or not
        const user = await pool.query("Select * from users where user_email = $1",[email])
        
        if (user.rows.length!= 0){

            res.status(401).json("User already exits")
            
        }

        //3. Becrypt password
        const saltRounds = 10
        const bcryptSalt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(password,bcryptSalt)

        

        //4. if not exits enter the user in 
        const newUser = await pool.query("Insert into users (user_name,user_email,user_password) values ($1,$2,$3) RETURNING *",[name,email,hashPassword])
        
        
        //5. generate the jwt token
        const token = jwtGenerate(newUser.rows[0].user_id)
        res.json({token})
        
    } catch (error) {
        // console.log(error.message)
        res.status(500).json("Server Error")
    }
})


// Login Route
router .post("/login",validInfo,async (req,res) => {
    //1. Destructure the request body

    const {email,password} = req.body

    //2. Check if user exists or not (if not then raise an error)
    
    const user = await pool.query("Select * from users where user_email = $1",[email])
    if (user.rows.length ==0){
        res.status(404).json("User not Found")
    }

    //3. Check whether the password is same as the database password
    const db_hash_password = user.rows[0].user_password
    
    const isPasswordSame = await bcrypt.compare(password,db_hash_password)
    
    if (isPasswordSame){
        const token = jwtGenerate(user.rows[0].user_id)
        res.json({token})
    }
    else{
        res.status(404).json("Incorrect Password Try again")
    }



})

router.get("/is-verify",authorize,(req,res)=>{
    try {
        res.json(true)
    } catch (error) {
        // console.log(error.message)
        res.status(500).json("Server Error")
    }
})

module.exports = router;