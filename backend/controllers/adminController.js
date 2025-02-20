import Admin from "../models/Admin..js";

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Enter all credentials" });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.staus(404).json({ message: "Admin not found" });
        }
    } catch (error) {
        console.log("Error in admin login : ", error);
        return res.status(200).json({ message: "Internal server error" });
    }
}

export {
    adminLogin,
}