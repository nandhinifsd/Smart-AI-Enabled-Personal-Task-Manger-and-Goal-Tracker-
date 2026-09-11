import React, { useState } from "react";

const DeleteGoalModal = ({ goal, onClose, onGoalDeleted }) => {

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {

    setIsDeleting(true);

    try {

      const response = await fetch(
        `http://localhost:3000/goals/${goal.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }

      // Tell TaskKanban that deletion was successful
      if (onGoalDeleted) {
        onGoalDeleted(goal.id);
      }

      // Close modal
      onClose();

    } catch (error) {

      console.error("Error deleting goal:", error);
      setIsDeleting(false);

    }
  };

  return (

    <div className="fixed inset-0 z-50
                    flex items-center justify-center
                    bg-black/40 px-4">

      <div className="w-full max-w-md
                      rounded-xl bg-white
                      p-6 shadow-xl">

        {/* Heading */}

        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Delete Goal?
        </h2>


        {/* Message */}

        <p className="text-gray-600 mb-2">
          Are you sure you want to delete this goal?
        </p>

        <p className="font-semibold text-purple-800 mb-2">
          {goal.goalName}
        </p>

        <p className="text-sm text-red-500 mb-6">
          This will permanently delete the goal and all its tasks.
        </p>


        {/* Buttons */}

        <div className="flex gap-3">

          {/* Cancel */}

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-lg
                       bg-gray-100
                       px-4 py-2
                       text-gray-700
                       hover:bg-gray-200
                       disabled:opacity-50"
          >
            Cancel
          </button>


          {/* Delete */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 rounded-lg
                       bg-red-500
                       px-4 py-2
                       text-white
                       hover:bg-red-600
                       disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "OK"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteGoalModal;