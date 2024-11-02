// src/Components/DataSet.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin, addUser, removeAdmin, removeUser } from '../redux/adminUserSlice';
import Modal from './Modal';


export default function DataSet() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const admins = useSelector((state) => state.adminUser.admins);
  const users = useSelector((state) => state.adminUser.users);
  const dispatch = useDispatch();

  const openModal = (title) => {
    setModalTitle(title);
    if (title === 'Remove Admin') {
      setDropdownOptions(admins.map(admin => admin.username)); // Pass admin usernames to the dropdown
    } else if (title === 'Remove User') {
      setDropdownOptions(users.map(user => user.username)); // Pass user usernames to the dropdown
    } else {
      setDropdownOptions([]);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username?.value || '';
    const password = e.target.password?.value || '';
    const selectedName = e.target.selectName?.value;
  
    let storedData = JSON.parse(localStorage.getItem('formData')) || [];
  
    if (modalTitle === 'Remove Admin') {
      dispatch(removeAdmin(selectedName));
      storedData = storedData.filter((user) => user.username !== selectedName || user.title !== 'Add Admin');
    } else if (modalTitle === 'Remove User') {
      dispatch(removeUser(selectedName));
      storedData = storedData.filter((user) => user.username !== selectedName || user.title !== 'Add User');
    } else if (modalTitle === 'Add Admin') {
      const newAdmin = { title: 'Add Admin', username, password };
      dispatch(addAdmin(newAdmin));
      storedData.push(newAdmin);
    } else if (modalTitle === 'Add User') {
      const newUser = { title: 'Add User', username, password };
      dispatch(addUser(newUser));
      storedData.push(newUser);
    }
  
    localStorage.setItem('formData', JSON.stringify(storedData)); // Save updated data to localStorage
    closeModal();
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <nav className="space-x-4">
            <button onClick={() => openModal('Add Admin')} className="bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100">
              Add Admin
            </button>
            <button onClick={() => openModal('Add User')} className="bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100">
              Add User
            </button>
            <button onClick={() => openModal('Remove Admin')} className="bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100">
              Remove Admin
            </button>
            <button onClick={() => openModal('Remove User')} className="bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100">
              Remove User
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Admin and User List</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left font-medium text-gray-700">Role</th>
              <th className="px-4 py-2 border-b text-left font-medium text-gray-700">Name</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-gray-700">Admin</td>
                <td className="px-4 py-2 text-gray-700">{admin.username}</td>
              </tr>
            ))}
            {users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-gray-700">User</td>
                <td className="px-4 py-2 text-gray-700">{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalTitle}
        onSubmit={handleSubmit}
        options={dropdownOptions} // Pass the options to the Modal
      />

<footer className="bg-black text-white py-4">
  <div className="container mx-auto px-4 text-center">
    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    <p className="mt-2">
      <a href="/privacy-policy" className="hover:underline">
        Privacy Policy
      </a>{" "}
      |{" "}
      <a href="/terms-of-service" className="hover:underline">
        Terms of Service
      </a>{" "}
      |{" "}
      <a href="/contact" className="hover:underline">
        Contact Us
      </a>
    </p>
  </div>
</footer>

    </div>
  );
}
