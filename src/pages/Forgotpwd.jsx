
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Forgotpwd = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const [securityAnswer, setSecurityAnswer] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // --------------------------------
  // STEP 1 - FIND USER
  // --------------------------------
  const handleFindUser = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const enteredEmail = email.trim().toLowerCase();

    if (!enteredEmail) {
     setError("Please enter your email address.");
      return;
    }

    if (!emailRegex.test(enteredEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/users?email=${encodeURIComponent(
          enteredEmail
        )}`
      );

      if (!response.ok) {
        throw new Error("Unable to find user.");
      }

      const users = await response.json();

      if (users.length === 0) {
        setError("No account found with this email address.");
        return;
      }

      setUser(users[0]);

      setStep(2);
    } catch (error) {
      console.error(error);
      setError("Unable to find your account. Please try again.");
    }
  };

  // --------------------------------
  // STEP 2 - VERIFY SECURITY ANSWER
  // --------------------------------
  const handleVerifyAnswer = (e) => {
    e.preventDefault();

    setError("");

    if (!securityAnswer.trim()) {
      setError("Please enter your security answer.");
      return;
    }

    const correctAnswer =
      user.securityAnswer?.trim().toLowerCase();

    const enteredAnswer =
      securityAnswer.trim().toLowerCase();

    if (enteredAnswer !== correctAnswer) {
      setError("Incorrect security answer. Please try again.");
      return;
    }

    setStep(3);
  };

  // --------------------------------
  // STEP 3 - CHANGE PASSWORD
  // --------------------------------
  const handleChangePassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      
      

      const response = await fetch(
        `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
      firstname:user.firstname,
      lastname: user.lastname,
      phoneNumber:user.phoneNumber,
      email:user.email,
      password:newPassword,
      securityQuestion:user.securityQuestion,
      securityAnswer:user.securityAnswer,
      id:user.id}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update password.");
      }

      setSuccess(
        "Password changed successfully. Please login with your new password."
      );

      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("Unable to change password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-100 to-white px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        {/* HEADER */}
        <div className="text-center">

          <h1 className="text-3xl font-bold text-purple-900">
            Forgot Password?
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {step === 1 &&
              "Enter your email address to find your account."}

            {step === 2 &&
              "Answer your security question to verify your identity."}

            {step === 3 &&
              "Create a new password for your account."}
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        {/* ============================= */}
        {/* STEP 1 - EMAIL */}
        {/* ============================= */}

        {step === 1 && (
          <form onSubmit={handleFindUser} className="mt-7">

            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Continue
            </button>

          </form>
        )}

        {/* ============================= */}
        {/* STEP 2 - SECURITY QUESTION */}
        {/* ============================= */}

        {step === 2 && user && (
          <form onSubmit={handleVerifyAnswer} className="mt-7">

            <label className="text-sm font-medium text-gray-700">
              Security Question
            </label>

            <div className="mt-2 rounded-xl bg-purple-50 p-4 text-sm font-medium text-purple-900">
              {user.securityQuestion}
            </div>

            <label className="mt-5 block text-sm font-medium text-gray-700">
              Your Answer
            </label>

            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => {
                setSecurityAnswer(e.target.value);
                setError("");
              }}
              placeholder="Enter your answer"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Verify Answer
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setSecurityAnswer("");
                setError("");
              }}
              className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-3 font-medium text-gray-600 hover:bg-gray-50"
            >
              Back
            </button>

          </form>
        )}

        {/* ============================= */}
        {/* STEP 3 - NEW PASSWORD */}
        {/* ============================= */}

        {step === 3 && (
          <form onSubmit={handleChangePassword} className="mt-7">

            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter new password"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <p className="mt-2 text-xs text-gray-500">
              Minimum 8 characters with uppercase, lowercase, number
              and special character.
            </p>

            <label className="mt-5 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              placeholder="Confirm new password"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Change Password
            </button>

          </form>
        )}

        {/* LOGIN LINK */}

        <div className="mt-6 text-center text-sm text-gray-500">

          Remember your password?{" "}

          <Link
            to="/signin"
            className="font-semibold text-purple-600 hover:text-purple-800"
          >
            Login
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Forgotpwd;