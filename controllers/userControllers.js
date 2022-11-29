const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const validUser=await User.findOne({email});
        if(!validUser){
            return res.status(400).json({message:"please provide valid credentials"});
        }
        const match=await bcrypt.compare(password,validUser.password);
        if(!match){
            return res.status(400).json({message:"please provide valid credentials"});
        }
        const accessToken=jwt.sign(
            {
                email,
                role:validUser.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1h'}
        );

        const refreshToken=jwt.sign(
            {email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        );
        // Create secure cookie with refresh token 
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })
        res.status(200).json({success:true,role:validUser.role,accessToken});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}

const refresh=async(req,res)=>{
    const cookies=req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    const refreshToken = cookies.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async(err,decoded)=>{
            if(err) return res.status(403).json({message:'Forbidden Access'});
            try {
                const foundUser=await User.findOne({email:decoded.email});
                const accessToken=jwt.sign(
                    {
                        email:foundUser.email,
                        role:foundUser.role 
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:"1h"}   
                );
                res.status(200).json({ accessToken,role:foundUser.role });
            } catch (error) {
                console.log(error.message);
                res.status(400).json({message:error.message});
            }
        }
    )
}

const logout=async(req,res)=>{
    try {
        const cookies = req.cookies;
        if(cookies?.jwt) {
            await res.clearCookie('jwt',{httpOnly:true,sameSite:"None",secure:true});
        }
        res.json({message:"logout successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});        
    }
}

const createUser=async(req,res)=>{
    try {
        const duplicate=await User.findOne({email:req.body.email});
        if(duplicate){
            return res.status(400).json({message:"User With given credentials already present"})
        }

        let user=new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt);
        await user.save();
        res.status(201).json({message:"User Successfully Created",user});
    } catch (error) {
        if(error._message)
            return res.status(400).json({message:"Please provide required Fileds"});
        res.status(500).json({message:"Internal Server Error"});
    }
}

const getAllUsers=async(req,res)=>{
    if(req.user.role!=='admin')
        return res.status(401).json({message:"unauthorised access"});
    try {
        const users=await User.find({"role": {$ne : "admin"}});
        res.status(200).json({users});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
}

const getUser=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if(req.user.role==='admin' || req.user.email===user.email){
            return res.status(200).json({user});
        }
        res.status(400).json({message:"unauthorised access"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
}

const updateUser=async(req,res)=>{
    try {
        let user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!user)
            return res.status(404).json({message:"no user with given id"});
        res.status(200).json({message:"user updated successfully",user});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
}

module.exports={createUser,updateUser,getAllUsers,getUser,login,logout,refresh};