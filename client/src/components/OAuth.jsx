import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const res = await fetch("/auth/google", {
        method: "POST",
        headers: {
          "CONTENT-TYPE": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not Login with google");
    }
  };
  return (
<button
  onClick={handleGoogleClick}
  type="button"
  className="border border-black text-lg hover:bg-blue-700 hover:text-white w-full  rounded-full p-2 hover:opacity-90 flex items-center justify-center"
>
  <div className="flex items-center">
    <FaGoogle className=" mr-2" /> 
    <div>Continue with Google</div>
  </div>
</button>
  );
}
