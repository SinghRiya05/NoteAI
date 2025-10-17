import jwt from "jsonwebtoken";
import HTTP_STATUS from "../utils/constants.js";
import sendResponse from "../utils/sendResponse.js";

const authMiddleware = (req, res, next) => {
  try {
    // ✅ Get token from cookies
    const token = req.cookies?.accessToken;

    // ❌ If token not found
    if (!token) {
      return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, false, "No token provided");
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user info to request object
    req.user = decoded;

    // ✅ Move to next middleware/controller
    next();

  } catch (error) {
    // ⚠️ Handle expired or invalid token
    console.error("Auth Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, false, "Token expired. Please log in again.");
    }

    return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, false, "Invalid token.");
  }
};

export default authMiddleware;
