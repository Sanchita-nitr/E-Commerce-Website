import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        if (!name) {
            return res.send({ message: "Name is Required" });
        }

        if (!email) {
            return res.send({ message: "Email is Required" });
        }

        if (!password) {
            return res.send({ message: "Password is Required" });
        }

        if (!phone) {
            return res.send({ message: "Phone is Required" });
        }

        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        }).save();
        res.status(200).send({
            success: true,
            message: "User Registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Invalid email or password '
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};
//forgotpassword controller
export const forgotpasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'Email is required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'Answer is required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'New Password is required' })
        }
        //check
        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went Wrong",
            error
        })
    }
};
//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes")
    }
    catch (error) {
        console.log(error);
        res.send({ error })
    }

};
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;

        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(400).json({ error: "Unauthorized request. User ID missing." });
        }

        // Fetch user from database
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Optional: Hash password if provided
        let hashedPassword = user.password;
        if (password && password.length >= 6) {
            hashedPassword = await hashPassword(password);
        } else if (password && password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long." });
        }

        // Update user details
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                email: email || user.email, // Ensure email isn't accidentally modified
                password: hashedPassword,
                address: address || user.address,
                phone: phone || user.phone,
            },
            { new: true } // Return the updated user document
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            updatedUser,
        });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        res.status(500).json({ error: "Internal Server Error. Unable to update profile." });
    }
};
