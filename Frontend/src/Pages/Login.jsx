import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Importing icons
import { ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useState } from "react";

const Login = () => {
  const { login, loading } = useUserStore();
  const [authInfo, setauthInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(authInfo, navigate);
    console.log("Logged in");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-2 sm:px-0">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4 mt-1">
          Kirish
        </h2>
        <p className="text-sm text-center text-blue-800 mb-6">
          Elektron pochta manzilingiz va parolingizni kiriting
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              required
              value={authInfo.email}
              onChange={(e) =>
                setauthInfo({ ...authInfo, email: e.target.value })
              }
              className=" relative mt-1 block w-full px-4 py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-black"
            />
            <div className="absolute left-3 top-1/2 transform translate-y-1 text-gray-500 flex flex-row items-center">
              <FaEnvelope />
            </div>
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Parol:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="******"
              value={authInfo.password}
              onChange={(e) =>
                setauthInfo({ ...authInfo, password: e.target.value })
              }
              className="relative text-black mt-1 block w-full px-4 py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            />
            <div className="absolute left-3 top-1/2 transform translate-y-1 text-gray-500 flex flex-row items-center">
              <FaLock />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent 
            rounded-md shadow-sm text-md font-medium text-white bg-emerald-600
             hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Yuklanmoqda...
              </>
            ) : (
              <>Kirish</>
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Hisobingiz yo&apos;qmi?{" "}
          <Link
            to="/signup"
            className="font-medium text-emerald-600 hover:text-emerald-400"
          >
            Ro&apos;yhatdan o&apos;tish{" "}
            <ArrowRight className=" h-4 w-4 inline" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
