import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signupController= async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json(
                {message :"Name, Email and Password are required"}
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user=await User.create({
            name:name,
            email:email,
            password:hashedPassword
        });

        const token=jwt.sign(
            {userId : user._id},
            process.env.JWT_SECRET,
            {expiresIn : "7d"}
        )

        res.cookie("token",token,{
            httpOnly: true,
            sameSite : "none",
            secure: true,
            maxAge: 7*24*60*60*1000,
        })

        return res.status(200).json({
            message:"Signup successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }catch(err){
        console.log(`SignUp Error: ${err.message}`);

        return res.status(500).json({
            message:"Server Error"
        })
    }
}



export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json(
                {message :"Email and Password are required"}
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const match=await bcrypt.compare(password, user.password);
        
        if(!match){
            return res.status(401).json({
                message: "Please enter valid email and password"
            });
        }

        const token=jwt.sign(
            {userId : user._id},
            process.env.JWT_SECRET,
            {expiresIn : "7d"}
        )

        res.cookie("token",token,{
            httpOnly: true,
            sameSite : "none",
            secure: true,
            maxAge: 7*24*60*60*1000,
        })

        return res.status(200).json({
            message:"login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.log(`Login Error: ${error.message}`);

        return res.status(500).json({
            message:"Server Error"
        })
    }

}


export const logoutController=async (req,res)=>{
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message:"Logout successful"
        })
    } catch (error) {
        console.log(`Logout Error ${error.message}`);
        return res.status(500).json({
            message:"Server Error"
        })
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};
