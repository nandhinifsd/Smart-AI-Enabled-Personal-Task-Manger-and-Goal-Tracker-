import React, { useState } from "react";

const FiltersModal = ({ onClose, onApply }) => {

  const [priority, setPriority] = useState("All");
  const [dueDate, setDueDate] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy,setSortBy]=useState("default");

  return (
    <div className="fixed inset-0 z-50
                    flex items-center justify-center
                    bg-black/40 px-4">

      <div className="w-full max-w-lg
                      bg-white rounded-2xl shadow-2xl
                      p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold text-purple-800">
            Apply Filters
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800
                       text-xl"
          >
            ✕
          </button>

        </div>


        {/* Priority */}
        <div className="mb-6">

          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Priority
          </h3>

          <div className="flex flex-wrap gap-3">

            <button className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100" onClick={() => setPriority("All")}>
              All
            </button>

            <button className="px-4 py-2 rounded-full bg-red-50 text-red-700 hover:bg-red-100" onClick={() => setPriority("High")}>
              High
            </button>

            <button className="px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 hover:bg-yellow-100" onClick={() => setPriority("Medium")}>
              Medium
            </button>

            <button className="px-4 py-2 rounded-full bg-green-50 text-green-700 hover:bg-green-100" onClick={() => setPriority("Low")}>
              Low
            </button>

          </div>

        </div>


        {/* Due Date */}
        <div className="mb-6">

          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Due Date
          </h3>

          <div className="flex flex-wrap gap-3">

            <button className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100" onClick={() => setDueDate("All")}>
              All
            </button>

            <button className="px-4 py-2 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100" onClick={() => setDueDate("Overdue")}>
              Overdue
            </button>

            <button className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100" onClick={() => setDueDate("Today")}>
              Today
            </button>

            <button className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100" onClick={() => setDueDate("This Week")}>
              This Week
            </button>

          </div>

        </div>


        {/* Status */}
        <div className="mb-6">

          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Status
          </h3>

          <div className="flex flex-wrap gap-3">

            <button className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100" onClick={() => setStatus("All")}>
              All
            </button>

            <button className="px-4 py-2 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100" onClick={() => setStatus("Pending")}>
              Pending
            </button>

            <button className="px-4 py-2 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100" onClick={() => setStatus("Todo today")}>
              Todo Today
            </button>

            <button className="px-4 py-2 rounded-full bg-green-50 text-green-700 hover:bg-green-100" onClick={() => setStatus("Completed")}>
              Completed
            </button>

          </div>

        </div>

        {/* Sorting */}
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Sort By
  </label>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="w-full border rounded-lg px-3 py-2"
  >
    <option value="default">Default</option>
    <option value="priority-high">Priority: High → Low</option>
    <option value="priority-low">Priority: Low → High</option>
    <option value="due-earliest">Due Date: Earliest → Latest</option>
    <option value="due-latest">Due Date: Latest → Earliest</option>
    <option value="name-az">Task Name: A → Z</option>
    <option value="name-za">Task Name: Z → A</option>
  </select>
</div>

        

{/* Selected Filters */}
<div className="border-t border-gray-200 pt-4 mt-6">

  <h3 className="text-sm font-semibold text-gray-600 mb-3">
    Selected Filters
  </h3>

  <div className="flex flex-row gap-2">

    {priority !== "All" && (
      <span className="flex items-center gap-1
                       px-3 py-1
                       rounded-full
                       bg-purple-100 text-purple-700
                       text-sm">

        {priority}

        <button
          type="button"
          onClick={() => setPriority("All")}
          className="font-bold hover:text-purple-900"
        >
          ×
        </button>

      </span>
    )}


    {dueDate !== "All" && (
      <span className="flex items-center gap-1
                       px-3 py-1
                       rounded-full
                       bg-pink-100 text-pink-700
                       text-sm">

        {dueDate}

        <button
          type="button"
          onClick={() => setDueDate("All")}
          className="font-bold hover:text-pink-900"
        >
          ×
        </button>

      </span>
    )}


    {status !== "All" && (
      <span className="flex items-center gap-1
                       px-3 py-1
                       rounded-full
                       bg-green-100 text-green-700
                       text-sm">

        {status}

        <button
          type="button"
          onClick={() => setStatus("All")}
          className="font-bold hover:text-green-900"
        >
          ×
        </button>

      </span>
    )}


    {/* Nothing selected */}
    {priority === "All" &&
      dueDate === "All" &&
      status === "All" && (
        <span className="text-sm text-gray-400">
          No filters selected
        </span>
      )}

  </div>

</div>



        {/* Bottom buttons */}
        <div className="flex gap-3 mt-8">

          <button
            type="button"
            className="flex-1 px-4 py-2 rounded-lg
                       bg-gray-100 text-gray-700
                       hover:bg-gray-200 transition"
             onClick={() => {
                            setPriority("All");
                            setDueDate("All");
                            setStatus("All");
                            setSortBy("default");
                            }}
          >
            Clear
          </button>

          <button
            type="button"
            className="flex-1 px-4 py-2 rounded-lg
                       bg-purple-500 text-white
                       hover:bg-purple-600 transition"
            onClick={() => {    onApply({  priority: priority,
                                           dueDate: dueDate,
                                           status: status,
                                           sortBy: sortBy
                                       });

                                onClose();
                             }}
          >
            Apply Filters
          </button>

        </div>

      </div>

    </div>
  );
};

export default FiltersModal;