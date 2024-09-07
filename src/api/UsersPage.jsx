import React, { useState } from 'react';
import { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } from './apiSlice';

const UsersPage = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [newUser, setNewUser] = useState('');
  const [userId, setUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  if (isLoading) return <p>Loading...</p>;

  const handleAddUser = async () => {
    await addUser({ name: newUser });
    setNewUser('');
  };

  const handleUpdateUser = async () => {
    await updateUser({ id: userId, name: updatedName });
    setUserId(null);
    setUpdatedName('');
  };

  return (
    <div>
      <h1>Foydalanuvchilar</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>O'chirish</button>
            <button onClick={() => {
              setUserId(user.id);
              setUpdatedName(user.name);
            }}>Yangilash</button>
          </li>
        ))}
      </ul>
      <input value={newUser} onChange={(e) => setNewUser(e.target.value)} placeholder="Yangi foydalanuvchi" />
      <button onClick={handleAddUser}>Foydalanuvchini qo'shish</button>

      {userId && (
        <div>
          <input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} placeholder="Yangilangan nom" />
          <button onClick={handleUpdateUser}>Yangilash</button>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
