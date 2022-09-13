// import { useContext } from "react"
import { BrowserRouter as Router, Navigate, Route } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Navigate>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Main/>} />
      </Navigate>
    </Router>
  );
};

export default AppRouter;