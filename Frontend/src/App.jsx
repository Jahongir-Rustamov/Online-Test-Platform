import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./companents/Navbar";
import HomePage from "./Pages/HomePage";
import AdminDashboard from "./Pages/AdminDashboard";
import CreateTest from "./Pages/CreateTest";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MyTestsOnWorked from "./Pages/MyTestsOnWorked";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./companents/LoadingSpinner";
import EachTests from "./Pages/EachTests";
import QuestionsPages from "./Pages/QuestionsPages";
import CheckAnswer from "./Pages/CheckAnswer";

const App = () => {
  const { user, checkingAuth, checkAuth } = useUserStore();
  const location = useLocation();
  const name = location.state?.name;
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <>
      <div className="bg-[#f8fafc] min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to={"/"} />}
          />
          <Route
            path="/admin-dashboard"
            element={
              user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/create-test"
            element={
              user?.role === "teacher" ? (
                <CreateTest />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/my-tests"
            element={user ? <MyTestsOnWorked /> : <Navigate to={"/login"} />}
          />
          <Route path={`/subject/:id`} element={<EachTests name={name} />} />
          <Route
            path={"/get/questions/:id"}
            element={user ? <QuestionsPages /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/checked_answers/:encodedTestID"
            element={<CheckAnswer />}
          />
        </Routes>
      </div>
      <Toaster />
    </>
  );
};

export default App;
