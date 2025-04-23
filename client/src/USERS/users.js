import React, { useEffect, useState } from "react";
import "./use.css";
import BasicModal from "../component/form-modal";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { BASE_URL } from "../util/util";

function Users() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`, {
          method: "GET",
        });
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/delete/${deleteId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      setData(result);
      setShowModal(false);
      setDeleteId(null);
    } catch (err) {
      console.log(err);
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <div className="users-container">
      <h1>List of Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Date Joined</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((userData) => (
              <tr key={userData._id.toString()}>
                <td>{userData.username}</td>
                <td>{userData.email}</td>
                <td>{new Date(userData.createdAt).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <BasicModal data={userData}>
                      <IconButton color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                    </BasicModal>
                    <IconButton
                      onClick={() => handleDeleteClick(userData._id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this user?</p>
            </div>
            <div className="modal-footer">
              <button onClick={handleDelete} className="modal-btn confirm">
                Yes
              </button>
              <button onClick={closeModal} className="modal-btn cancel">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
