import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import Owner from "./models/Owner.js";
import Shop from "./models/Shop.js";

const seedDatabase = async () => {

    await connectDB();

    const hashedPassword = await bcrypt.hash(
        process.env.OWNER_PASSWORD,
        12
    );

    let owner = await Owner.findOne({
        phone: process.env.OWNER_PHONE
    });

    if (!owner) {

        owner = await Owner.create({
            name: "Nirjesh Kumar Gupta",
            phone: process.env.OWNER_PHONE,
            password: hashedPassword
        });

        console.log("Owner created");
    }

    let shop = await Shop.findOne();

    if (!shop) {

        await Shop.create({
            name: "Shiv Electronics Shop",

            ownerName: "Shiv Kumar",

            phone: process.env.OWNER_PHONE,

            address: "Prayagraj, Uttar Pradesh",

            isOpen: false,

            description:
                "घर के इलेक्ट्रॉनिक सामान की मरम्मत के लिए भरोसेमंद सर्विस।",

            services: [
                "TV Repair",
                "Fridge Repair",
                "Washing Machine Repair",
                "Cooler Repair",
                "Heater Repair",
                "Iron / Press Repair",
                "Microwave Repair",
                "Fan Repair",
                "Other Electronics"
            ],

            testimonials: [
                {
                    name: "Rahul Verma",
                    comment:
                        "बहुत अच्छा काम करते हैं और सही दाम लेते हैं।",
                    rating: 5
                },
                {
                    name: "Amit Singh",
                    comment:
                        "मेरी washing machine जल्दी ठीक कर दी। बहुत बढ़िया सर्विस।",
                    rating: 5
                },
                {
                    name: "Pooja Sharma",
                    comment:
                        "टीवी की समस्या तुरंत ठीक कर दी। बहुत अच्छा अनुभव रहा।",
                    rating: 5
                },
                {
                    name: "Rakesh Gupta",
                    comment:
                        "ईमानदारी से काम करते हैं। मैं जरूर recommend करूंगा।",
                    rating: 5
                }
            ]
        });

        console.log("Shop created");
    }

    console.log("Database seeded");

    process.exit(0);
};

seedDatabase();