import Shop from "../models/Shop.js";

export const getShop = async (req, res) => {
    try {
        const shop = await Shop.findOne();

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found"
            });
        }

        res.status(200).json({
            success: true,
            shop
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const updateShopStatus = async (req, res) => {
    try {
        const { isOpen } = req.body;

        if (typeof isOpen !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isOpen must be boolean"
            });
        }

        const shop = await Shop.findOneAndUpdate(
            {},
            {
                isOpen
            },
            {
                new: true
            }
        );

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found"
            });
        }

        res.status(200).json({
            success: true,
            message: `Shop is now ${isOpen ? "OPEN" : "CLOSED"}`,
            shop
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};