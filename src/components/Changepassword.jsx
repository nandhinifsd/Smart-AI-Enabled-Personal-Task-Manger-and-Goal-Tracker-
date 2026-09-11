
import React, { useState } from "react";
import { useDispatch } from "react-redux";
 import { logoutState } from "../redux/authSlice";
 import { useNavigate } from "react-router-dom";
const Changepassword = ({ user, onBack }) => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
const dispatch = useDispatch();
const navigate=useNavigate();

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 async function handleSubmit (e)
  {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check empty fields
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    // Check password length
    if (newPassword.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }


    //check passpword matches pattern

    if (!passwordRegex.test(password)) {
             setError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
  return;
}
    // Check passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Temporary success
    setSuccess("Password is ready to be updated.");

    console.log("User:", user);
    console.log("New password:", newPassword);
    console.log("User received:", user);
console.log("User ID:", user?.id);
console.log(
  "PATCH URL:",
  `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/users/${user?.id}`
);

      try {
    const response = await fetch(
      `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/users/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update password");
    }

    const updatedUser = await response.json();

    console.log("Updated user:", updatedUser);

    setSuccess("Password changed successfully.");

    setNewPassword("");
    setConfirmPassword("");

    // Password successfully changed
      alert("Password changed successfully. Please login again.");

      // Clear authentication
      dispatch(logoutState());

      // Go to login page
      navigate("/signin");


  } catch (error) {
    console.error("Error changing password:", error);
    setError("Unable to change password. Please try again.");
  }
};

  

  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-md">

      <h2 className="text-2xl font-bold text-purple-900">
        Change Password
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">

        {/* New password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="mt-2 w-full rounded-xl border border-gray-300
                       px-4 py-3 outline-none
                       focus:border-purple-500
                       focus:ring-2 focus:ring-purple-200"
          />
        </div>

        {/* Confirm password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            className="mt-2 w-full rounded-xl border border-gray-300
                       px-4 py-3 outline-none
                       focus:border-purple-500
                       focus:ring-2 focus:ring-purple-200"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Success */}
        {success && (
          <p className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
            {success}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            type="submit"
            className="flex-1 rounded-xl bg-purple-600
                       px-4 py-3 font-medium text-white
                       hover:bg-purple-700"
          >
            Change Password
          </button>

          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-gray-300
                       px-5 py-3 text-gray-600
                       hover:bg-gray-50"
          >
            Back
          </button>

        </div>

      </form>

    </div>
  );
};

export default Changepassword;
