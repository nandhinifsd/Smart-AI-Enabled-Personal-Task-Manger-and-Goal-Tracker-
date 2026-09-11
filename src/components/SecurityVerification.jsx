
import React, { useState } from "react";


const SecurityVerification = ({ user, onVerified, onCancel }) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (!answer.trim()) {
      setError("Please enter your answer.");
      return;
    }

    const correctAnswer =
      user.securityAnswer?.trim().toLowerCase();

    const enteredAnswer =
      answer.trim().toLowerCase();

    if (enteredAnswer === correctAnswer) {
      setError("");
      onVerified();
    } else {
      setError("Incorrect security answer. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-md">

      <h2 className="text-xl font-semibold text-purple-900">
        Verify Your Identity
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Answer your security question correctly to continue.
      </p>

      <div className="mt-6">

        <label className="block text-sm font-medium text-gray-700">
          Security Question
        </label>

        <div className="mt-2 rounded-xl bg-purple-50 p-4 text-purple-900">
          {user.securityQuestion}
        </div>

      </div>

      <div className="mt-5">

        <label className="block text-sm font-medium text-gray-700">
          Your Answer
        </label>

        <input
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError("");
          }}
          placeholder="Enter your answer"
          className="mt-2 w-full rounded-xl border border-gray-300
                     px-4 py-3 outline-none
                     focus:border-purple-500 focus:ring-2
                     focus:ring-purple-200"
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

      </div>

      <div className="mt-6 flex gap-3">

        <button
          onClick={handleVerify}
          className="flex-1 rounded-xl bg-purple-600
                     px-4 py-3 font-medium text-white
                     hover:bg-purple-700"
        >
          Verify Answer
        </button>

        <button
          onClick={onCancel}
          className="rounded-xl border border-gray-300
                     px-5 py-3 text-gray-600
                     hover:bg-gray-50"
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default SecurityVerification;
