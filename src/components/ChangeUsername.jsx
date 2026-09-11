import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutState } from "../redux/authSlice";

const ChangeUsername = ({ user, onBack }) => {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // 1. Check empty field
    if (!newUsername.trim()) {
      setError("Please enter a new username.");
      return;
    }
    console.log(user);
    //Check email pattern
    if (!emailRegex.test(email)) {
  setError("Please enter a valid email address.");
  return;
}

    // 2. Don't allow the same username
    if (
      newUsername.trim().toLowerCase() ===
      user.email?.trim().toLowerCase()
    ) {
      setError("Please enter a different username.");
      return;
    }

    try {
      // 3. Update username in database
      const response = await fetch(
        `http://localhost:3000/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: newUsername.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      // 4. Password flow logs the user out.
      // We can use the same approach here if desired.
      alert("Username changed successfully. Please login again.");

      localStorage.removeItem("user");

      dispatch(logoutState());

      navigate("/signin");

    } catch (error) {
      console.error("Error changing username:", error);
      setError("Unable to change username. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-md">

      <h1 className="text-2xl font-bold text-purple-900">
        Change Username
      </h1>

      <p className="mt-2 text-gray-600">
        Enter the new username you want to use for your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">

        <label className="block text-sm font-medium text-gray-700">
          New Username
        </label>

        <input
          type="text"
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value);
            setError("");
          }}
          placeholder="Enter new username"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex gap-3">

          <button
            type="submit"
            className="rounded-xl bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700"
          >
            Change Username / Email
          </button>

          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-gray-300 px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            Back
          </button>

        </div>
      </form>
    </div>
  );
};

export default ChangeUsername;