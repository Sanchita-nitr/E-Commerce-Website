import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";

export const createProductController = async (req, res) => {
    try {
        console.log("Fields: ", req.fields); // Debug fields
        console.log("Files: ", req.files);   // Debug files
        const { name, price, description, category, shipping, quantity } = req.fields;
        const { photo } = req.files;
        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000: // Corrected size validation
                return res.status(500).send({ error: "Photo must be less than 1MB" });
        }

        console.log("Photo Path:", photo.path); // Debugging file path
        console.log("Photo Type:", photo.type); // Debugging file type


        // Create product
        const product = new productModel({
            ...req.fields,
            slug: slugify(name)
        });

        // Handle photo
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
};

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "Product fetched successfully",
            total_products: products.length,
            products,

        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting product",
        });
    }

};

export const updateProductController = async (req, res) => {
    try {
        console.log("Fields: ", req.fields); // Debug fields
        console.log("Files: ", req.files);   // Debug files
        const { name, price, description, category, shipping, quantity } = req.fields;
        const { photo } = req.files;
        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000: // Corrected size validation
                return res.status(500).send({ error: "Photo must be less than 1MB" });
        }



        // Create product
        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });

        // Handle photo
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product",
        });
    }
}

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: "Single Product fetched successfully",
            product,

        })


    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting single product",
        });

    }
};

export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting product photo",
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",


        })
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in deleting product",
        });
    }

};
