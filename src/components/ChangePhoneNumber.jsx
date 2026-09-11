
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutState } from "../redux/authSlice";

const ChangePhoneNumber = ({ user, onBack }) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const phone = newPhoneNumber.trim();

    // 1. Check empty field
    if (!phone) {
      setError("Please enter a new phone number.");
      return;
    }

    // 2. Validate Indian 10-digit phone number
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // 3. Don't allow the same phone number
    if (phone === user.phoneNumber) {
      setError("Please enter a different phone number.");
      return;
    }

    try {
      // 4. Update phone number in database
      const response = await fetch(
        `http://localhost:3000/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update phone number");
      }

      // 5. Logout after changing account information
      alert("Phone number changed successfully. Please login again.");

      localStorage.removeItem("user");

      dispatch(logoutState());

      navigate("/signin");

    } catch (error) {
      console.error("Error changing phone number:", error);
      setError("Unable to change phone number. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-md">

      <h1 className="text-2xl font-bold text-purple-900">
        Change Phone Number
      </h1>

      <p className="mt-2 text-gray-600">
        Enter the new phone number you want to use for your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">

        <label className="block text-sm font-medium text-gray-700">
          New Phone Number
        </label>

        <input
          type="tel"
          value={newPhoneNumber}
          onChange={(e) => {
            setNewPhoneNumber(e.target.value);
            setError("");
          }}
          placeholder="Enter 10-digit phone number"
          maxLength={10}
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
            Change Phone Number
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

export default ChangePhoneNumber;

