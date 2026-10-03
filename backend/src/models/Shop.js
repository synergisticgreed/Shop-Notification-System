import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        ownerName: {
            type: String,
            required: true
        },

        ownerImage: {
            type: String,
            default: ""
        },

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        isOpen: {
            type: Boolean,
            default: false
        },

        services: [
            {
                type: String,
                trim: true
            }
        ],

        description: {
            type: String,
            default: ""
        },

        testimonials: [
            {
                name: String,
                comment: String,
                rating: {
                    type: Number,
                    min: 1,
                    max: 5
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;