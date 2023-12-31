import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7 ">Create Your Account</h1>
      <form onSubmit={handleSubmit} className="flex  flex-col gap-4 ">
        <input
          type="text"
          placeholder="Username"
          className=" p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className=" p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-600 p-3 rounded-lg uppercase text-white hover:opacity-90 disabled:opacity-70 "
        >
          {loading ? "Loading" : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex mt-4 gap-2">
        <p>have an account</p>
        <Link to={"/sign-in"}>
          <span className=" text-blue-700"> sign in</span>
        </Link>
        {error && <p className="text-red-500 mt-7">{error}</p>}
      </div>
    </div>
  );
}
