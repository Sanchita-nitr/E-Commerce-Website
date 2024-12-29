import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.ObjectId,
            ref: "Category",
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        quantity: {
            type: Number,
            required: true,
        },
        shipping: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
