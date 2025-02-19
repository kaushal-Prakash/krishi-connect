import User from "../models/User.js";
import jwt from "jsonwebtoken";

const setUser = async (email,password,res) =>{
    try {
        const user = await User.findOne({email});
        if(!user){
            return {message : "Invalid Username or Password"};
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return {message : "Invalid username or password"};
        }

        const token = jwt.sign({id:user._d,email:user.email},process.env.JWT.SECRET,{expiresIn:"7d"});

        res.cookie("token",token);

        return {message:"User logges in successfully"};
    } catch (error) {
        console.log("Error in setting user: ",error);
        return {message:"Internal Server Error"};
    }
}

function getUser(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
		return null;
	}
}

export {setUser,getUser};
