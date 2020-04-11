let users = [
  { id: "1", name: "Jane Doe", bio: "Some bio" },
  { id: "2", name: "John Doe", bio: "Not John Deere" },
  { id: "3", name: "Jack Doe", bio: "Married to Jill" },
];

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((u) => u.id === id);
}

function createUser(data) {
  const payload = {
    id: String(users.length + 1),
    ...data,
  };

  users.push(payload);
  return payload;
}

function updateUser(id, data) {
  const index = users.findIndex((u) => u.id === id);
  users[index] = {
    ...users[index],
    ...data,
  };

  return users[index];
}

function deleteUser(id) {
  users = users.filter((u) => u.id != id);
  return users;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
