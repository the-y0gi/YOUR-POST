const User = require("../model/user.model");
const generateOTP = require("../utils/generateOTP");
const { sendOTP } = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

exports.signupService = async (data) => {
  try {
    const { name, email, password, address, phoneNumber, avatar } = data;

    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      throw new Error("User already exists");
    }

    const otp = generateOTP();
    const otpExpire = Date.now() + 5 * 60 * 1000; // 5min

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
      user = new User({
        name,
        email,
        password: hashedPassword,
        address: address || "",
        phoneNumber: phoneNumber || "",
        avatar: avatar || "",
        otp,
        otpExpire,
        isVerified: false,
      });
    } else {
      user.otp = otp;
      user.otpExpire = otpExpire;
    }

    await user.save();

    await sendOTP(email, otp);

    return user;
  } catch (error) {
    throw error;
  }
};

exports.verifyOTPService = async (email, otp) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  if (user.otp !== otp || user.otpExpire < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpire = null;

  await user.save();

  return user;
};

exports.loginService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !user.isVerified) {
    throw new Error("Invalid credentials or not verified");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials or not verified");

  return user;
};
