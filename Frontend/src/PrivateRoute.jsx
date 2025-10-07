import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");


  if(!token) return <Navigate to="/"/>;

   try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      // token expire
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    }
    return children;
  } catch (e) {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
