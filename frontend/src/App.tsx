import { Toaster } from "react-hot-toast";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskList from "./components/TaskList";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />


        <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminHome />} />
        <Route path="/tasks" element={<TaskList />} />
        </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}/>
            
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
