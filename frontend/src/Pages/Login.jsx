import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Toast from "../components/Toast";

function Login() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(id, pass);
      if (id === "admin" && pass === "1234") {
        setToast({
          show: true,
          message: "Login successful!",
          type: "success"
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        
        setToast({
          show: true,
          message: "Details Mismatch!",
          type: "error"
        });
      }
    } catch (err) {
      setToast({
        show: true,
        message: "An error occurred during login",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "IMS - Login";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F3F2EE] to-[#D6FFFA]">
            {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="bg-white w-1/4 p-3 border rounded-lg shadow-sm">
      <div className="w-full ">
        <img src=".\src\assets\Images\login.png" alt="login" />
      </div>
      <form className=" space-y-4" onSubmit={handleLogin}>
          <div className="rounded-md mt-4 shadow-sm -space-y-px">
            <div className="mb-2">
              <label htmlFor="user-id" className="sr-only">
                User ID
              </label>
              <input
                id="user-id"
                name="user-id"
                type="text"
                required
                className=" appearance-none rounded relative block w-full px-3 py-2 border  text-gray-500 focus:outline-none  focus:z-10 sm:text-sm"
                placeholder="Enter ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border text-gray-900 focus:outline-none  focus:z-10 sm:text-sm"
                placeholder="Enter Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center animate-shake">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? " bg-black cursor-not-allowed"
                  : " bg-black hover:bg-white hover:text-black hover:outline focus:outline-none focus:ring-1 focus:ring-offset-"
              } transition-all duration-300 transform ease-in-out `}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

      </div>

    </div>  
  );
}

export default Login;
