import * as React from "react";
import "../USERS/use.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/util";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "fit-content",
  borderRadius: "15px",
};

export default function BasicModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  const passwordRegex = /^[a-zA-Z0-9=(!@##$%&)]{6,20}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));

    if (name === "username") {
      if (!usernameRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          username: "Username must be 3 characters long",
        }));
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    }

    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters and Uppercase",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !usernameRegex.test(formData.username) ||
      !passwordRegex.test(formData.password)
    ) {
      setErrors({
        username: !usernameRegex.test(formData.username)
          ? "Username must be 3 characters long"
          : "",
        password: !passwordRegex.test(formData.password)
          ? "Password must be at least 8 characters long and Uppercase"
          : "",
      });

      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/edit`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }

    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          borderColor: "green",
          height: "25px",
          color: "green",
          minWidth: "20px",
        }}
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="update-form" onSubmit={handleSubmit}>
            <h2>Edit Users</h2>
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
              {errors.username && (
                <Typography color="error" variant="caption">
                  {errors.username}
                </Typography>
              )}
            </div>
            <div>
              <input
                type="email"
                value={formData.email}
                readOnly
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password && (
                <Typography color="error" variant="caption">
                  {errors.password}
                </Typography>
              )}
            </div>
            <button>Update</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
