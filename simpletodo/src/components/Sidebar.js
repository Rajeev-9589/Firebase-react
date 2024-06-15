import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./Firebase";

function Sidebar({ selectedDate, onDateChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState(new Date());
  const [todoType, setTodoType] = useState("Other"); // Default to "Other" type
  const [message, setMessage] = useState(""); // State for success message

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AddTodo = async (typedTodo, chosenDate, typedTodoType) => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: typedTodo,
        date: chosenDate.toDateString(),
        type: typedTodoType,
      });
      // Set success message
      setMessage("Todo added successfully!");

      // Close modal and reset form
      closeModal();
      setTimeout(() => {
        setMessage("");
      }, 3000); 
    } catch (e) {
      console.error("Error adding todo: ", e);
    }
  };

  const isDateBeforeToday = (date) => {
    const today = new Date();
    return date < today;
  };

  return (
    <div className="w-88 h-full p-6 bg-gray-100 shadow-xl">
      <div className="p-4 bg-white rounded-lg shadow-lg mb-6">
        <Calendar
          className="custom-calendar mx-auto"
          onChange={onDateChange}
          value={selectedDate}
        />
      </div>
      <div className="text-center">
        <button
          onClick={openModal}
          className={`w-full rounded-xl py-3 ${
            isDateBeforeToday(selectedDate)
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-orange-600 text-white hover:bg-orange-500"
          } transition duration-300`}
          disabled={isDateBeforeToday(selectedDate)}
        >
          Add a todo
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add a Todo</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Todo
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Type
              <select
                value={todoType}
                onChange={(e) => setTodoType(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="College Work">College Work</option>
                <option value="Programming">Programming</option>
                <option value="Physique">Physique</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="block mb-4 text-sm font-medium text-gray-700">
              Date
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => AddTodo(todo, date, todoType)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add Todo
              </button>
            </div>
          </div>
        </div>
      )}
      {message && (
        <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white py-2 text-center">
          {message}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
