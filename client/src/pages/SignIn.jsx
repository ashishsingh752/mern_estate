import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart,signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
// import { useSelector } from "react-redux";

export default function SignIn() {
  const [formData, setFormData]= useState({});
  const {loading, error} = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
       dispatch(signInFailure(data.message));
        return;
      }
    dispatch(signInSuccess(data));
      navigate('/');
    }catch (error) {
     dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex  flex-col gap-4 ">
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
        <button disabled={loading} className="bg-slate-600 p-3 rounded-lg uppercase text-white hover:opacity-90 disabled:opacity-70 ">
        {loading?'Loading':'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className="flex mt-4 gap-2">
      <p>
        Dont have an account 
      </p>
        <Link to={'/sign-up'} >
          <span className=" text-blue-700"> sign up</span>
        </Link>
        {error && <p className="text-red-500 mt-7">{error}</p> }
      </div>
    </div>
  );
}
