import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { createStudent } from "../store/studentSlice";
import { listUsers } from "../store/userSlice";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Divider } from "primereact/divider";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentNum: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    teachers: [],
  });
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const users = useSelector((state) => state.users.list || []);

  useEffect(() => {
    if (currentUser && currentUser.role === "admin") {
      setIsAdmin(true);
      dispatch(listUsers());
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("Users list:", users);
  }, [users]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTeacherChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      teachers: e.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createStudent(formData));
    setFormData({
      firstName: "",
      lastName: "",
      studentNum: "",
      contactFirstName: "",
      contactLastName: "",
      contactEmail: "",
      contactPhone: "",
      teachers: [],
    });
  };

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-10">
        <Card>
          <div className="p-d-flex p-jc-between p-ai-center">
            <h1>Welcome {currentUser?.firstName}</h1>
            <Button
              label="Logout"
              icon="pi pi-sign-out"
              className="p-button-secondary"
              onClick={handleLogout}
            />
          </div>
        </Card>
      </div>

      {isAdmin && (
        <div className="p-col-12 p-md-10">
          <Panel header="Create a New Student">
            <form onSubmit={handleSubmit}>
              <div className="p-fluid">
                <div className="p-field">
                  <label htmlFor="firstName">First Name</label>
                  <InputText
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="p-field">
                  <label htmlFor="lastName">Last Name</label>
                  <InputText
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="p-field">
                  <label htmlFor="studentNum">Student Number</label>
                  <InputText
                    id="studentNum"
                    name="studentNum"
                    value={formData.studentNum}
                    onChange={handleChange}
                    required
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="p-field">
                  <label htmlFor="contactFirstName">Contact First Name</label>
                  <InputText
                    id="contactFirstName"
                    name="contactFirstName"
                    value={formData.contactFirstName}
                    onChange={handleChange}
                    required
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="p-field">
                  <label htmlFor="contactLastName">Contact Last Name</label>
                  <InputText
                    id="contactLastName"
                    name="contactLastName"
                    value={formData.contactLastName}
                    onChange={handleChange}
                    required
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="p-field">
                  <label htmlFor="contactEmail">Contact Email</label>
                  <InputText
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="p-field">
                  <label htmlFor="contactPhone">Contact Phone</label>
                  <InputMask
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    mask="(999) 999-9999"
                    required
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="p-field">
                  <label htmlFor="teachers">Teachers</label>
                  <MultiSelect
                    id="teachers"
                    value={formData.teachers}
                    options={users.map((user) => ({
                      label: `${user.firstName} ${user.lastName}`,
                      value: user.id,
                    }))}
                    onChange={handleTeacherChange}
                    placeholder="Select Teachers"
                    display="chip"
                    optionLabel="label"
                    className="w-full md:w-20rem"
                  />
                </div>
              </div>
              <Button
                type="submit"
                label="Create Student"
                icon="pi pi-check"
                className="p-button-sm p-mt-3"
              />
            </form>
          </Panel>
        </div>
      )}
    </div>
  );
};

export default Home;
