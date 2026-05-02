const userService = require("../services/user.service");
const generateToken = require("../utils/token");

exports.signup = async (req, res) => {
  try {
    const result = await userService.signupService(req.body);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully on your Email",
      //   data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userService.verifyOTPService(email, otp);

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.loginService(email, password);

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
