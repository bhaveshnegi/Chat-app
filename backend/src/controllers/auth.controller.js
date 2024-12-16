import { genrateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body;
    try {
        if(password.length<6){
            return res.status(400).json({message:"Password Must be at leat 6 character"});
        }

        const user= await User.findone({email});

        if(user) return res.status(400).json({message:"Email already exists"});
        
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt) //123456 => bjwuyk_32hosb
        
        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashPassword
        })

        if(newUser){
            // genrate jwt token here
            genrateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })

        }else{
            res.status(400).json({message:"invalid user data"})
        }
        
    } catch (error) {
        
    }
}

export const login = (req,res)=>{
    res.send("login route");
}

export const logout = (req,res)=>{
    res.send("logout route");
}