
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send({
          success: false,
          message: "Authorization token is missing",
        });
      }
  
      const decode = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decode; // Attach the user information to the request object
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      res.status(401).send({
        success: false,
        message: "Invalid or expired token",
        error: error.message,
      });
    }
  };

//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({
          success: false,
          message: "User information is missing. Ensure you are signed in.",
        });
      }
  
      const user = await userModel.findById(req.user._id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      if (user.role !== 1) {
        return res.status(403).send({
          success: false,
          message: "Forbidden: Admin access only",
        });
      }
  
      next(); // User is admin, proceed to the next middleware or controller
    } catch (error) {
      console.error("Admin middleware error:", error.message);
      res.status(500).send({
        success: false,
        message: "Internal Server Error in admin middleware",
        error: error.message,
      });
    }
  };
