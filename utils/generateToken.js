import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWTSECRET,
    { expiresIn: "7d" } // "7d" instead of "7days" (best practice)
  );
};

export const verifyUserToken = async (req, res, next) => {
  try {
    let token = req.signedCookies["token"] || req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: "Token not received" });
    }

    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      res.locals.jwtData = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

