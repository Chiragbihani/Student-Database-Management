import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT1 } from "../constants";

function TeacherAuth() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Enter Email and Password");
      }

      if (isSignUp && !name) {
        throw new Error("Enter Name");
      }

      const url = isSignUp
        ? `${API_ENDPOINT1}user/teacher-signup`
        : `${API_ENDPOINT1}user/teacher-login`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: isSignUp ? name : undefined,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignUp) {
          alert("Registration successful");
        } else {
          alert(data.message);
          localStorage.setItem("user", JSON.stringify(data.teacher));
          navigate("/teacher-classes");
        }
      } else {
        throw new Error(data.message || "An error occurred");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-1/2 lg:w-1/3 p-4 text-white bg-pBlue rounded-lg flex flex-col gap-4"
      >
        {isSignUp && (
          <label htmlFor="name">
            <h4>Name</h4>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 rounded-lg mt-2 text-black"
            />
          </label>
        )}
        <label htmlFor="email">
          <h4>Email</h4>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded-lg mt-2 text-black"
          />
        </label>
        <label htmlFor="password">
          <h4>Password</h4>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded-lg mt-2 text-black"
          />
        </label>
        <button type="submit" className="text-lg" disabled={isLoading}>
          {isLoading ? "..." : isSignUp ? "Sign up" : "Log in"}
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
      <p className="mt-4">
        <button className="mr-6">
          <Link to="/">Go Back</Link>
        </button>
        {isSignUp ? "Already have an account?" : `Don't have an account?`}
        <button className="ml-4" onClick={handleSwitch}>
          {isSignUp ? "Log in" : "Sign up"}
        </button>
      </p>
    </div>
  );
}

export default TeacherAuth;
