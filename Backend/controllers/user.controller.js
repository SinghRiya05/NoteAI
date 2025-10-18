import User from "../models/user.model.js";
import HTTP_STATUS from "../utils/constants.js";
import sendResponse from "../utils/sendResponse.js";

export const registerUser = async (req, res) => {
  try {
    
    const { username, email, password } = req.body;

    if(!username||!email||!password){
      return sendResponse(res,HTTP_STATUS.NOT_FOUND,false,"All the fields are required.")
    }

    if (username.trim().length< 3) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        false,
        "Username must be at least 3 characters long"
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        false,
        "Invalid email format"
      );
    }

    if (password.length < 6) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        false,
        "Password must be at least 6 characters long"
      );
    }

    const [existingEmail, existingUsername] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
    ]);

    if (existingEmail) {
      return sendResponse(
        res,
        HTTP_STATUS.CONFLICT,
        false,
        "Email is already registered"
      );
    }

    if (existingUsername) {
      return sendResponse(
        res,
        HTTP_STATUS.CONFLICT,
        false,
        "Username is already taken"
      );
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save(); // ✅ save first
    const accessToken = newUser.generateAccessToken(); // ✅ generate after

    // ✅ set secure cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // use HTTPS
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    const user = await User.findById(newUser._id).select("-password");

    return sendResponse(
      res,
      HTTP_STATUS.CREATED,
      true,
      "User registered successfully.",
      { accessToken, user }
    );
  } catch (error) {
    console.error("Register Error:", error.message);
    return sendResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      false,
      "Server error during registration"
    );
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Basic validation
    if (!email || !password) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, false, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, HTTP_STATUS.NOT_FOUND, false, "User not found");
    }

    // ✅ Check password
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, false, "Invalid password");
    }

    // ✅ Generate new access token
    const accessToken = user.generateAccessToken();

    // ✅ Set token in secure cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    const userData = await User.findById(user._id).select("-password");

    return sendResponse(
      res,
      HTTP_STATUS.OK,
      true,
      "Login successful",
      { accessToken, user: userData }
    );

  } catch (error) {
    console.error("Login Error:", error.message);
    return sendResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      false,
      "Server error during login"
    );
  }
};

export const checkAuth = async (req, res) => {
  try {
  
    // req.user comes from authMiddleware
    return sendResponse(res, 200, true, "User authenticated", { user: req.user });
  } catch (error) {
    return sendResponse(res, 401, false, "Not authenticated");
  }
};

export const logoutUser = (req, res) => {
  console.log("logout");
  
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return sendResponse(res, 200, true, "Logged out successfully");
};

