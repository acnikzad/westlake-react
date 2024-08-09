import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../store/authSlice";
import "./../scss/signup.scss";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("teacher");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("Form submitted");
    e.preventDefault();
    try {
      const response = await dispatch(
        registerUser({ email, password, firstName, lastName, role })
      ).unwrap();
      console.log("Response received", response);
      navigate("/login");
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      console.error("Error during registration", error);
      if (error.status === 500) {
        toast.error("This user already exists. Please try logging in.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
