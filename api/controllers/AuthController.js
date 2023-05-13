const AuthService = require("../services/AuthService")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    registerUser: async(req, res) => {
        console.log(req.body.username,req.body.email);

        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SEC
            ).toString()
          };
        
          try {
            const savedUser = await AuthService.registerUser(newUser);
            res.status(201).json(savedUser);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    loginUser: async (req, res) => {
        try{
            const user = await AuthService.findUser(req.body.username);
    
            !user && res.status(401).json("Wrong User Name");
        
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );
    
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
            const inputPassword = req.body.password;
            
            originalPassword != inputPassword && 
                res.status(401).json("Wrong Password");
    
            const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
                {expiresIn:"3d"}
            );
      
            const { password, ...others } = user._doc;  
            res.status(200).json({...others, accessToken});
    
        }catch(err){
            res.status(500).json(err);
        }
    
    }

}