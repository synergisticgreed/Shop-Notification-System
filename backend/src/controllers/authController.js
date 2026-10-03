
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";

export const loginOwner = async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Phone and password are required"
            });
        }

        const owner = await Owner.findOne({ phone });

        if (!owner) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            owner.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                ownerId: owner._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            success: true,
            token,
            owner: {
                id: owner._id,
                name: owner.name,
                phone: owner.phone
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};