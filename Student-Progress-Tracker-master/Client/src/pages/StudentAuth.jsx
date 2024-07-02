import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT1 } from "../constants";

function TeacherAuth() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allClassData, setAllClassData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllClasses = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT1}class/get-all-class`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }

        const classes = await response.json();
        setAllClassData(classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    getAllClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_ENDPOINT1}student/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNumber, studentClass }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      alert(data.message); // Replace with appropriate user feedback
      setIsLoading(false);
      navigate(`/student-profile/${data.student._id}`);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again."); // Handle error state gracefully
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h2 className="text-2xl mb-8 font-semibold">Student Login</h2>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-1/2 lg:w-1/3 p-4 text-white bg-pBlue rounded-lg flex flex-col gap-4"
      >
        <label htmlFor="rollNumber">Roll No</label>
        <input
          type="number"
          name="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
          className="w-full p-2 rounded-lg mt-2 text-black"
        />
        <label htmlFor="studentClass">Class:</label>
        <select
          className="text-black p-2 rounded-md"
          id="studentClass"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          required
        >
          <option value="">-</option>
          {allClassData.map((classData) => (
            <option key={classData._id} value={classData._id}>
              {`${classData.className}-${classData.year}-${classData.sem}`}
            </option>
          ))}
        </select>
        <button type="submit" className="text-lg" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <button className="mt-4 text-pBlue">
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
}

export default TeacherAuth;
