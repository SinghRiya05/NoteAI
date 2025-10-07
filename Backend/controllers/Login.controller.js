import HTTP_STATUS from "../utils/constants.js";
import sendResponse from "../utils/sendResponse.js";
import jwt from "jsonwebtoken";

const credentials = {
  name: "riya05",
  password: "riya2006",
};
const SECRET_KEY = "riyasingh";

export const userlogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    console.log(name);
    console.log(password);
    

    // 🔹 Check missing fields
    if (!name || !password) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        false,
        "Name and Password are required"
      );
    }

    // 🔹 Check credentials
    if (name !== credentials.name || password !== credentials.password) {
      return sendResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        false,
        "Invalid Credentials"
      );
    }

    // 🔹 If valid → create token
    const token = jwt.sign({ name }, SECRET_KEY, { expiresIn: "1h" });

    // 🔹 Return token in response
    return sendResponse(
      res,
      HTTP_STATUS.OK,
      true,
      "User LoggedIn successfully",
      { name, token }
    );
  } catch (error) {
    console.log(error);
    sendResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      false,
      "Failed to Login User",
      error
    );
  }
};
