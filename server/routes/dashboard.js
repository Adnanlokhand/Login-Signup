const pool = require("../db")
const authorize = require("../middleware/authorize")

const router = require("express").Router()

router.get("/",authorize,async (req,res)=>{
   try {
    const user = await pool.query("Select user_name from users where user_id = $1",[req.user])
    res.json(user.rows[0].user_name)
    
   } catch (error) {
      //   console.log(error.message)
        res.status(500).json("Server Error")
   }
})

module.exports = router