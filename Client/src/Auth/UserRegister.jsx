import React, { useState } from "react";
import { FiMail, FiLock, FiChevronRight, FiEye, FiEyeOff } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";
import { useCookies } from "react-cookie";
import BackButton from "../Components/BackButton";



const UserRegister = ({setShowModel,setShowModel1,id}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // Google Sign-In
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const googleUser = result.user;
        
        // Send Google user data to backend
        const response = await axios.post(`${import.meta.env.VITE_URL}user/google-login`, {
          email: googleUser.email,
          name: googleUser.displayName,
        });

        setCookie("token", response.data.token, { path: "/user" });
        // setShowModel(false); // *****
        navigate(`/user/${googleUser.uid}`);
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // User Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Check if user already exists in Firebase
      const existingUser = await signInWithEmailAndPassword(auth, email, password)
        .then(() => true)
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            return false;
          }
          throw error;
        });

      if (existingUser) {
        alert("User already exists! Please log in.");
        return;
      }

      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send user data to backend
      const registerResponse = await axios.post(`${import.meta.env.VITE_URL}user/register`, {
        name,
        email: user.email,
        password, 
      });

      setCookie("token", registerResponse.data.token, { path: "/user" });
      navigate(`/user/${user.uid}`);
      setShowModel(false); // *****
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Error signing up. Please try again.");
    }
  };

  // User Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Authenticate user in Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Authenticate user in backend
      const loginResponse = await axios.post(`${import.meta.env.VITE_URL}user/login`, {
        email: user.email,
        password,
      });

      setCookie("token", loginResponse.data.token, { path: "/user" });
      navigate(`/user/${user.uid}`);
      setShowModel(false); //**** 
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm p-5 sm:p-6 md:p-8 backdrop-blur-xl bg-[#1A1A1A] rounded-xl border border-amber-500/20">
            <div className="text-center mb-6">
            <BackButton setShowModel={setShowModel} destination={`/user/${id}`} />
              <h2 className="text-xl sm:text-2xl font-bold text-amber-500">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                {isLogin ? "Sign in to your account" : "Join our exclusive community"}
              </p>
            </div>
    
            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4 sm:space-y-5">
               
            {!isLogin && ( 
            <div className="relative">
            <LuUserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              required
            />
            </div>
          )}

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>
    
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
    
              {!isLogin && (
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              )}
    
              <button type="submit" className="w-full py-2 sm:py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition duration-300">
                <span className="flex items-center justify-center">
                  {isLogin ? "Login" : "Sign Up"}
                  <FiChevronRight className="ml-2" size={16} />
                </span>
              </button>
            </form>
    
            <div className="my-4 text-center text-gray-400 text-sm">or continue with</div>
    
            <button className="w-full py-2 sm:py-3 bg-white text-gray-700 flex items-center justify-center gap-2 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300" onClick={googleLogin}>
              <FcGoogle size={20} />
              Continue with Google
            </button>
    
            <div className="mt-4 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="text-amber-500 font-medium hover:underline text-sm">
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </button>
            </div>
          </div>
  );
};

export default UserRegister;
