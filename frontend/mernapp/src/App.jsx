import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState({
    id: 0,
    name: "",
    role: "",
    isLogin: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {    
        const response = await axios.get('http://localhost:5555/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Ошибка получения данных:', error);
      }
    };

    fetchData();
    
  }, []);

  const deleteUser = async (userId) => {
    try {
      console.log(userId)
      await axios.delete(`http://localhost:5555/api/users/${userId}`)
    } catch (e) {
      console.log("ошибка")
    }
  }

  async function createUser(event) {
    try {
      event.preventDefault();
      console.log("Submitting:", newUserName);
      await axios.post("http://localhost:5555/api/users", newUserName);
    } catch (error) {
      console.error("Error:", error.message, error.response);
    }
  }


  return (
    <div>
      <h1>Users</h1>
      <form>
        <input 
          type="text" 
          onChange={(e) => setNewUserName({ ...newUserName, id: e.target.value })}
        />
        <input 
          type="text" 
          onChange={(e) => setNewUserName({ ...newUserName, name: e.target.value })}
        />
        <input 
          type="text" 
          onChange={(e) => setNewUserName({ ...newUserName, role: e.target.value })}
        />
        <input 
          type="checkbox" 
          onChange={(e) => setNewUserName({ ...newUserName, isLogin: e.target.checked })}
        />
      <button onClick={createUser}>Create User</button>
      </form>
      {users.length === 0 ? (
        <p>Данных нет</p>
        ) : (
          <>
            <ul>
              {users.map((user) => (
                <li 
                key={user.id}
                style={{
                  color: user.role === "Admin" ? "red" : "green"
                }}
                >{user.name} - {user.role}
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                  <button onClick={() => {setIsModalOpen(true); }}>Edit</button>
                </li>
              ))}
            </ul>
              <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  />
          </>
      )}
    </div>
  );
}

export default App;
