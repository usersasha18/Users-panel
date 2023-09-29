import React from 'react';
import "../global.css";

export default function Modal({ isModalOpen, onClose }) {

  return (
    <>  
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <label htmlFor="userId">ID:</label>
            <input type="text" id="userId"  />

            <label htmlFor="userName">Имя:</label>
            <input type="text" id="userName"  />

            <label htmlFor="userRole">Роль:</label>
            <input type="text" id="userRole"   />

            <label htmlFor="isUserLogin">Логин:</label>
            <input type="checkbox" id="isUserLogin"/>

            <button>Изменить</button>
          </div>
        </div> 
      )}
    </>
  );
}
