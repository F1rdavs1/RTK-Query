import React, { useState } from "react";
import Modal from "react-modal";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../api/Api";

const UsersPage = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [newUser, setNewUser] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  const handleAddUser = async (e) => {
    e.preventDefault(); 
    await addUser({ name: newUser });
    setNewUser("");
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      await updateUser({ id: selectedUser.id, name: updatedName });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-[#E3E9FF] h-[100vh] text-center pt-[30px]">
      <h1 className="text-white mb-[10px] text-[20px] bg-[#AF7EEB] w-[500px] py-[10px] mx-auto font-mono">
        Users Todo
      </h1>
      <form
        className="flex flex-col border-b-[4px] justify-center mx-auto w-[500px]"
        onSubmit={handleAddUser}
      >
        <input
          className="outline-none w-[100%] py-[10px] border-[red] text-[20px] pl-[10px] font-mono bg-[white] font-semibold text-[green] placeholder-gray-700"
          placeholder="Enter users"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button className="hidden" type="submit">
          Add User
        </button>{" "}
      </form>
      <ul className="w-[500px] mx-auto bg-[white] py-[40px]">
        {users.map((item, index) => (
          <li
            key={item.id}
            className="flex justify-between items-center px-[20px] py-[5px]"
          >
            <span className="font-medium text-[18px] font-mono">
              {index + 1}. {item.name}
            </span>
            <div className="space-x-3">
              <button
                className="bg-[red] font-medium px-[10px] py-[5px] rounded-md text-white font-mono"
                onClick={() => deleteUser(item.id)}
              >
                Delete
              </button>
              <button
                className="bg-[green] font-medium px-[10px] py-[5px] rounded-md text-white font-mono"
                onClick={() => openModal(item)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        className="w-[600px] h-[230px] rounded-[20px] mt-[90px] pt-[40px] text-center font-mono bg-slate-600 mx-auto"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <h2 className="text-[20px] mb-[4px] text-white">Update User</h2>
        <form>
          <input
            className="py-[6px] text-[17px] pl-[4px] outline-none rounded-md"
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </form>
        <div className="mt-[30px] space-x-3">
          <button
            className="text-[20px] bg-[green] rounded-md text-white px-[10px] py-[5px]"
            onClick={handleUpdateUser}
          >
            Save
          </button>
          <button
            className="text-[20px] bg-[red] rounded-md text-white px-[10px] py-[5px]"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UsersPage;
