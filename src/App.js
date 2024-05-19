import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "./config"; // Adjust the path accordingly
import { db } from "./config";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    first: "",
    last: "",
    born: "",
  });

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(
          "ans==>",
          JSON.stringify(querySnapshot.docs[1]._document.data)
        );
        setUsers(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Handle form submit for adding or updating user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser.id) {
        // Update existing user
        const userDoc = doc(db, "users", currentUser.id);
        await updateDoc(userDoc, {
          first: currentUser.first,
          last: currentUser.last,
          born: parseInt(currentUser.born),
        });
        console.log("Document updated with ID: ", currentUser.id);
      } else {
        // Add new user
        const docRef = await addDoc(collection(db, "users"), {
          first: currentUser.first,
          last: currentUser.last,
          born: parseInt(currentUser.born),
        });
        console.log("Document written with ID: ", docRef.id);
      }
      // Reset form and fetch users again
      setCurrentUser({ id: "", first: "", last: "", born: "" });
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setCurrentUser(user);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      console.log("Document deleted with ID: ", id);
      // Fetch users again after delete
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="app">
      {console.log(JSON.stringify(users))}
      <h1>Add/Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first"
            value={currentUser.first}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last"
            value={currentUser.last}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Year of Birth:</label>
          <input
            type="text"
            name="born"
            value={currentUser.born}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">
          {currentUser.id ? "Update User" : "Add User"}
        </button>
      </form>

      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first} {user.last} ({user.born})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
