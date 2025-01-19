const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpgenerator = require("otp-generator");
const User = require("../models/User");
const OTP = require("../models/OTP");

exports.Signup = async (req, res) => {
  try {
    const {firstName,lastName, email, password, confirmPassword, otp } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Fetch the most recent OTP for the given email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);

    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const recentOTP = response[0].OTP;

    if (otp !== recentOTP) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in signup",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields (email, password, role) are required",
      });
    }

    // Hardcoded credentials for doctor and admin
    const validCredentials = [
      { email: "mdshahabuddin0516@gmail.com", password: "87654321" },
      { email: "122arsalanahmed@gmail.com", password: "87654321" },
    ];

    // Check role for doctor or admin
    if (role === "doctor" || role === "admin") {
      const isValid = validCredentials.some(
        (cred) => cred.email === email && cred.password === password
      );

      if (isValid) {
        const payLoad = { email, role };
        const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });

        return res.status(200).json({
          success: true,
          token,
          role,
          message: `${role.charAt(0).toUpperCase() + role.slice(1)} Login Success`,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password for doctor or admin",
        });
      }
    }

    // Regular user login logic
    if (role === "user") {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      if (await bcrypt.compare(password, user.password)) {
        const payLoad = {
          id: user._id,
          email: user.email,
          role: user.role,
        };
        const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });

        user.token = token;
        user.password = undefined;

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        return res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Password is incorrect",
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: "Invalid role specified",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in login",
    });
  }
};


exports.SendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate a unique OTP
    let otp;
    let isUnique = false;

    do {
      otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const existingOTP = await OTP.findOne({ OTP: otp });
      if (!existingOTP) {
        isUnique = true; // OTP is unique
      }
    } while (!isUnique);

    // Save the OTP to the database
    const otpPayload = { email, OTP: otp };
    const otpBody = await OTP.create(otpPayload);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otpBody,
    });
  } catch (error) {
    console.error("Error in SendOTP:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in sending OTP",
    });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};



exports.verifyOtp = async (req, res) => {
  try {
      const { email, otp } = req.body;

      // Fetch the most recent OTP for the given email
      const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      if (response.length === 0 || response[0].OTP !== otp) {
          return res.status(400).json({
              success: false,
              message: "Invalid OTP",
          });
      }

      return res.status(200).json({
          success: true,
          message: "OTP verified successfully",
      });
  } catch (error) {
      console.error("Error during OTP verification:", error);
      return res.status(500).json({
          success: false,
          message: "Something went wrong during OTP verification",
      });
  }
};


