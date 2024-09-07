import React, { useState } from "react";
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "./Api";

const UsersPage = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [newUser, setNewUser] = useState("");
  const [userId, setUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  if (isLoading) return <p>Loading...</p>;

  const handleAddUser = async () => {
    await addUser({ name: newUser });
    setNewUser("");
  };

  const handleUpdateUser = async () => {
    await updateUser({ id: userId, name: updatedName });
    setUserId(null);
    setUpdatedName("");
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <button
              onClick={() => {
                setUserId(user.id);
                setUpdatedName(user.name);
              }}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
      <input
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="New users"
      />
      <button onClick={handleAddUser}>Add user</button>

      {userId && (
        <div>
          <input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Updated name"
          />
          <button onClick={handleUpdateUser}>Update</button>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
