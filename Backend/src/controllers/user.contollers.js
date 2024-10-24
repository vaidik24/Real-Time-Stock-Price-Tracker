import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/apiError.util.js";
import { ApiResponse } from "../utils/apiResponse.util.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating refresh and access tokens");
  }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedIncomingRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedIncomingRefreshToken?._id);
    if (!user || incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token expired or used");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Refresh token invalid or expired");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password, phoneNumber } = req.body;

  if ([email, username, password, fullName, phoneNumber].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    email: email,
    username: username.toLowerCase(),
    password: password,
    fullname: fullName.toLowerCase(),
    phoneNumber: phoneNumber,
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User registered successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || password.trim() === "") {
    throw new ApiError(400, "Username/email and password are required");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (!existedUser || !(await existedUser.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const loggedInUser = await User.findById(existedUser._id).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, { user: loggedInUser }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  // Currently no token invalidation logic implemented
  return res
    .status(204) // No content returned for logout
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});


export { registerUser, loginUser, logoutUser, refreshAccessToken };
