import React, { useState } from "react";
import LoginImage from "../Assets/LoginImage.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      if (confirmPassword == password) {
        axios
          .post(`user/register.php`, {
            email: email,
            password: password,
          })
          .then((res) => {
            console.log(res);
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("passwords dont match");
      }
    } else {
      alert("All fields are mandatory");
    }
  };
  return (
    <div className="flex justify-center align-middle h-[100vh] bg-white">
      <div className="w-2/3 bg-gray">
        <img src={LoginImage} />
      </div>
      <div className="w-1/3 flex justify-center align-middle p-6 flex-col">
        <h3 className="text-center text-2xl font-bold mb-3 text-[#0C1844]">
          Events Management
        </h3>
        <p className=" text-center text-xl font-bold mb-6">Register</p>
        <form className="flex justify-center align-middle flex-col">
          <input
            type="email"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <p className=" text-end text-gray-700">
            <span className="cursor-pointer text-xs font-semibold hover:text-black">
              Forgot Password?
            </span>
          </p>
          <button
            className=" bg-[#0C1844] text-white rounded-md px-4 py-2 font-semibold shadow-md hover:shadow-none focus:outline-none"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </form>
        <p className="text-xs text-gray-700 mt-3">
          Already registered?{" "}
          <a href="/login">
            <span className=" text-teal-500 cursor-pointer underline font-semibold">
              Log in
            </span>
          </a>
        </p>
        <button className="mt-5 space-y-3">
          <div className="border-2 border-gray-700 flex items-center justify-center rounded-md px-4 py-2">
            <svg
              className="h-5 w-5 mr-1"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Sign up with Google</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
