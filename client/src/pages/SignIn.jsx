import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign in</h1>
      <form className="flex  flex-col gap-4 ">
        <input
          type="email"
          placeholder="Email"
          className=" p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-600 p-3 rounded-lg uppercase text-white hover:opacity-90 disabled:opacity-70 ">
          sign in
        </button>
      </form>

      <div className="flex mt-4 gap-2">
      <p>
       Don't Have an account 
      </p>
        <Link to={'/sign-up'} >
          <span className=" text-blue-700"> sign up</span>
        </Link>
      </div>
    </div>
  );
}