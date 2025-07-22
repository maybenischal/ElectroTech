import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const { login, register, loading } = useAuth();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (currentState === "Signup") {
        if (!name || !email || !password) {
          return;
        }
        const success = await register(name, email, password);
        if (success) {
          navigate("/");
        }
      } else {
        if (!email || !password) {
          return;
        }
        const success = await login(email, password);
        if (success) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center w-full justify-center px-4 bg-gray-50">
      <div className="bg-white shadow-xl px-8 py-8 w-full max-w-md rounded-lg border-gray-100 flex flex-col items-center text-gray-800">
        <form onSubmit={onSubmitHandler} className="w-full">
          {/*Header*/}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {currentState}
            </h1>
            <div className="w-12 h-0.5 bg-blue-500"></div>
          </div>

          {/*Username field - only show for signup*/}
          {currentState === "Signup" && (
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                key="name-input"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}

          {/*Email*/}
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              key="email-input"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
              focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {/*Password*/}
          <div className="w-full mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              key="password-input"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
              focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] mb-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                {currentState === "Login" ? "Signing In..." : "Signing Up..."}
              </div>
            ) : (
              currentState === "Login" ? "Sign In" : "Sign Up"
            )}
          </button>

          {/* Forgot Password - only show for login */}
          {currentState === "Login" && (
            <div className="text-center mb-6">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center w-full mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <span className="relative bg-white px-4 text-gray-500 text-sm">
              or
            </span>
          </div>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Signup" : "Login")
            }
            className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]
            cursor-pointer"
          >
            {currentState === "Login"
              ? "Create Your Account"
              : "Already have an account? Login"}
          </button>
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
