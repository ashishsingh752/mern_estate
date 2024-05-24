import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const { loading, setLoading } = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 2000); // Show error for 3 seconds
        return;
      }
      dispatch(signInSuccess(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      setLoading(false)
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 2000); 
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-sm px-8 py-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-center">Welcome Back</h3>
        <p className="text-gray-700 text-base mt-4 mb-3">
          Sign in to continue
        </p>
        <div className="w-full mb-0.5">
          <OAuth />
        </div>
        <div className="w-full flex items-center justify-between mt-2 mb-2">
          <hr className="w-full bg-gray-300 border-0" />
          <span className="text-sm text-gray-500 px-2">OR</span>
          <hr className="w-full bg-gray-300 border-0" />
        </div>

        <div className="w-full flex items-center justify-center mt-1 mb-1">
          <span className="text-xl font-bold px-2">Sign In</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="email"
          >
            Enter email *
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
          
          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="password"
          >
            Enter password *
          </label>
          <div className="relative w-full">
            <input
              id="password"
              type={isOpen ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md flex justify-center items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to={"/sign-up"} className="text-blue-600 hover:underline focus:outline-none">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
