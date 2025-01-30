import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa"; // Importing icons
import { useState } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const SignUp = () => {
  const [authInfo, setauthInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { signup, loading } = useUserStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(authInfo, navigate);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-2 pt-8 sm:px-0 sm:pt-4 lg:pt-6 ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-4 mt-1">
          Ro&apos;yxatdan o&apos;tish
        </h2>
        <p className="text-sm text-center text-blue-800 mb-6">
          Email, to&apos;liq ism va parolingizni kiriting
        </p>
        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              To&apos;liq ism:
            </label>
            <input
              type="text"
              value={authInfo.name}
              id="fullname"
              name="fullname"
              placeholder="Ismingiz"
              required
              onChange={(e) =>
                setauthInfo({ ...authInfo, name: e.target.value })
              }
              className=" relative text-black mt-1 block w-full px-4 py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            />
            <div className="absolute left-3 top-1/2 transform translate-y-1 text-gray-500 flex items-center flex-row">
              <FaUser />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4 relative">
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
              value={authInfo.email}
              placeholder="example@gmail.com"
              onChange={(e) =>
                setauthInfo({ ...authInfo, email: e.target.value })
              }
              required
              className="relative text-black mt-1 block w-full px-4 py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            />
            <div className="absolute left-3 top-1/2 transform translate-y-1 text-gray-500 flex items-center flex-row">
              <FaEnvelope />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
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
              placeholder="******"
              required
              value={authInfo.password}
              onChange={(e) =>
                setauthInfo({ ...authInfo, password: e.target.value })
              }
              className="relative text-black mt-1 block w-full px-4 py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            />
            <div className="flex flex-row items-center absolute left-3 top-1/2 transform translate-y-1 text-gray-500">
              <FaLock />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Parolni tasdiqlang:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="******"
              required
              value={authInfo.confirmPassword}
              onChange={(e) =>
                setauthInfo({ ...authInfo, confirmPassword: e.target.value })
              }
              className="relative text-black mt-1 block w-full px-4 py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            />
            <div className="flex flex-row items-center absolute left-3 top-1/2 transform translate-y-1 text-gray-500">
              <FaLock />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent 
            rounded-md shadow-sm text-md font-medium text-white bg-emerald-600
             hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Yuklanmoqda...
              </>
            ) : (
              "Ro'yxatdan o'tish"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Hisobingiz bormi?{" "}
          <Link
            to="/login"
            className="font-medium text-emerald-600 hover:text-emerald-400"
          >
            Kirish <ArrowRight className="inline h-4 w-4" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
