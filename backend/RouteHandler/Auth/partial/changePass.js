const User = require("../../../Schemas/User/userSchema");

const changePassword = async (userId, currentPassword, newPassword, confirmNewPassword) => {
  try {
    if (!userId || !currentPassword || !newPassword || !confirmNewPassword) {
      return { status: 400, message: "All fields are required" };
    }

    if (newPassword !== confirmNewPassword) {
      return { status: 400, message: "Passwords do not match" };
    }

    if (newPassword.length < 6) {
      return {
        status: 400,
        message: "New password must be at least 6 characters long",
      };
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    // Compare the current password with the hashed password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return { status: 401, message: "Incorrect current password" };
    }

    // Hash and update the new password
    user.password = newPassword;
    await user.save();

    return { status: 200, message: "Password updated successfully" };
  } catch (error) {
    console.error("Error changing password:", error);
    return { status: 500, message: "Internal server error" };
  }
};

module.exports = changePassword;
