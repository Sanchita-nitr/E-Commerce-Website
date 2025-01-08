
import braintree from "braintree";
import dotenv from "dotenv";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";


dotenv.config();

// Create Product
export const createProductController = async (req, res) => {
    try {
        console.log("Fields: ", req.fields); // Debug fields
        console.log("Files: ", req.files);   // Debug files
        const { name, price, description, category, shipping, quantity } = req.fields;
        const { photo } = req.files;

        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

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
            case photo && photo.size > 5000000: // Corrected size validation
                return res.status(500).send({ error: "Photo must be less than 5MB" });
        }

        // Generate unique slug
        let slug = slugify(name);
        const existingProduct = await productModel.findOne({ slug });
        if (existingProduct) {
            slug = `${slug}-${Date.now()}`; // Make the slug unique
        }

        // Create product
        const product = new productModel({
            ...req.fields,
            slug,
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
        console.error("Error in createProductController:", error);
        res.status(500).send({
            success: false,
            error: error.message || "Error in creating product",
        });
    }
};


// Get All Products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });

        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.status(200).send({
            success: true,
            message: "Product fetched successfully",
            total_products: products.length,
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting product",
        });
    }
};

// Update Product
export const updateProductController = async (req, res) => {
    try {
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

        // Generate unique slug if name is updated
        let slug = slugify(name);
        const existingProduct = await productModel.findOne({ slug });
        if (existingProduct && existingProduct._id.toString() !== req.params.pid) {
            slug = `${slug}-${Date.now()}`; // Make the slug unique
        }

        const product = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug },
            { new: true }
        );

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
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product",
        });
    }
};


// Get Single Product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug })
            .select('-photo')
            .populate('category');

        res.status(200).send({
            success: true,
            message: "Single Product fetched successfully",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting single product",
        });
    }
};

// Get Product Photo
export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo');
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting product photo",
        });
    }
};

// Delete Product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in deleting product",
        });
    }
};

//filter product 
export const filterProductController = async (req, res) => {
    try {
        const { checked, radio } = req.body;

        // Initialize an empty query object
        let args = {};

        // Add category filter if checked is not empty
        if (checked && checked.length > 0) {
            args.category = { $in: checked }; // Use $in to match any of the checked categories
        }

        // Add price filter if radio is provided and valid
        if (radio && radio.length === 2) {
            const [minPrice, maxPrice] = radio;
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                args.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
            }
        }

        // Fetch products based on the constructed query
        const products = await productModel.find(args);

        // Send the filtered products as a response
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Filtering Products",
            error,
        });
    }
};

//count product
export const countProductController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });

    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Counting Products",
            error,
        });
    }
};


//productList
export const productListController = async (req, res) => {
    try {
        const perPage = 12
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select("-photo").skip((page - 1)).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products,

        })
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Product Per Page",
            error,
        });
    }
};

// search Product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        console.log("Search keyword:", keyword); // Debugging log

        // Escape special characters in the keyword
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const results = await productModel.find({
            $or: [
                { name: { $regex: escapedKeyword, $options: "i" } },
                { description: { $regex: escapedKeyword, $options: "i" } },
            ],
        }).select("-photo");

        console.log("Search results:", results); // Debugging log

        if (results.length === 0) {
            return res.status(200).send({
                success: true,
                message: "No products found.",
                results: [],
            });
        }

        res.status(200).send({
            success: true,
            results,
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(400).send({
            success: false,
            message: "Error in Search Product",
            error,
        });
    }
};

//similar product
export const similarProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        if (!pid || !cid) {
            return res.status(400).send({
                success: false,
                message: "Product ID and Category ID are required",
            });
        }

        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid }, // Exclude the current product
            })
            .select("-photo") // Exclude the photo field
            .limit(5) // Limit the results to 5
            .populate("category");

        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Error in similar product:", error);
        res.status(400).send({
            success: false,
            message: "Error in similar product",
            error,
        });
    }
};

//category wise product
export const categoryWiseProductController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category: category._id }).populate('category');
        res.status(200).send({
            success: true,
            category,
            products,
        });
    }

    catch (error) {
        console.error("Error in category wise product:", error);
        res.status(400).send({
            success: false,
            message: "Error in getting product",
            error,
        });
    }

}

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//payment
export const braintreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export const getOrdersController = async (req, res) => {
    try {
      console.log("Fetching orders for user:", req.user._id);
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
  
      console.log("Fetched orders:", orders);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).send({
        success: false,
        message: "Error While Getting Orders",
        error: error.message,
      });
    }
  };
  

//orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};