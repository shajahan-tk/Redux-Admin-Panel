// src/Components/Modal.jsx
import React from 'react';

export default function Modal({ isOpen, onClose, title, onSubmit, options }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={onSubmit}>
          {/* Conditionally render the dropdown if options are provided */}
          {options.length > 0 ? (
            <div className="mb-4">
              <label htmlFor="selectName" className="block text-gray-700">Select Name:</label>
              <select name="selectName" id="selectName" className="w-full border border-gray-300 rounded-md p-2">
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Username:</label>
                <input type="text" name="username" id="username" className="w-full border border-gray-300 rounded-md p-2" required />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input type="password" name="password" id="password" className="w-full border border-gray-300 rounded-md p-2" required />
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
