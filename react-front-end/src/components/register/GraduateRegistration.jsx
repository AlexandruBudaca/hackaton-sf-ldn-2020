import React, { useState, useEffect } from "react";
import Separator from "../Separator";
import "./index.css";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const GraduateRegistration = () => {
  const [graduate, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const [userCreated, setUserCreated] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    fetch("https://sf-hackathon-2020.herokuapp.com/api/users")
      .then((res) => res.json())
      .then((data) => setDataUsers(data));
  }, []);
  let emailGraduate;
  const checkForEmailGraduate = () => {
    dataUsers.find((data) =>
      data.email === graduate.email ? (emailGraduate = data.email) : null
    );
    return emailGraduate;
  };

  const handleChange = (event) => {
    const newUser = {
      ...graduate,
      [event.target.name]: event.target.value,
    };
    setUser(newUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Email validation
    if (!graduate.email.includes("@")) {
      return alert("Please enter Valid email");
    }
    if (graduate.password.length < 6) {
      return alert("password should have at least 6 symbols");
    }
    if (graduate.password !== graduate.password2) {
      alert("Passwords do not match!");
    }
    if (graduate.firstName.length < 2) {
      return alert("The first name should have at least 2 characters.");
    }
    if (graduate.lastName.length < 2) {
      return alert("The last name should have at least 2 characters.");
    }
    //Check if
    checkForEmailGraduate();
    emailGraduate === graduate.email
      ? alert("The email is already in the database")
      : fetch(`https://sf-hackathon-2020.herokuapp.com/api/users/signup`, {
          method: "POST",
          body: JSON.stringify(graduate),
          headers: { "Content-Type": "application/json" },
        }).then(setUserCreated(!userCreated));
  };

  return (
    <section className="companiesSection">
      <Separator category={"User Registration"} />
      {userCreated ? (
        <div className="singUpBack">
          Your account was created!
          <Link to="/" className="backBtnSignUp">
            Back
          </Link>
        </div>
      ) : (
        <div>
          <section className="mainRegister">
            <Link to="./CompanyRegistration" className="backBtnSignUp">
              Register as a Company?
            </Link>
            <div className="div-form-graduates">
              <div className="div-form">
                <form onSubmit={handleSubmit}>
                  <ul>
                    <li>
                      <label>
                        First name:
                        <input
                          className="select"
                          name="firstName"
                          onChange={handleChange}
                          required
                          data-tip="at least 2 symbols"
                        ></input>
                        <ReactTooltip />
                      </label>
                    </li>
                    <li>
                      <label>
                        Last name:
                        <input
                          className="select"
                          name="lastName"
                          onChange={handleChange}
                          required
                          data-tip="at least 2 symbols"
                        ></input>
                        <ReactTooltip />
                      </label>
                    </li>
                    <li>
                      <label>
                        Email:
                        <input
                          className="select"
                          name="email"
                          onChange={handleChange}
                          required
                          data-tip="must include @ symbol"
                        ></input>
                        <ReactTooltip />
                      </label>
                    </li>
                    <li>
                      <label>
                        Password:
                        <input
                          className="select"
                          name="password"
                          onChange={handleChange}
                          type="password"
                          required
                          data-tip="min. 6 symbols"
                        ></input>
                        <ReactTooltip />
                      </label>
                    </li>
                    <li>
                      <label>
                        Confirm Password:
                        <input
                          className="select"
                          name="password2"
                          type="password"
                          onChange={handleChange}
                          // onChange={confirmPasswordValidation}
                          required
                          data-tip="min. 6 symbols"
                        ></input>
                        <ReactTooltip />
                      </label>
                    </li>
                  </ul>
                  <button>Register</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};
export default GraduateRegistration;
