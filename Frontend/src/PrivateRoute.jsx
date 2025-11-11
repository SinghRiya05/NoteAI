import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "./api/api.js"; // ✅ make sure API is exported from api.js
import Spinner from "./components/Spinner.jsx";

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // ✅ call a protected endpoint
        const res = await checkAuth();
        console.log("Authenticated user:", res.data);
        setIsAuth(true);
      } catch (error) {
        console.error("User not authenticated:", error);
        setIsAuth(false);
      }
    };
    verifyUser();
  }, []);

  if (isAuth === null) return <div><Spinner/></div>;
  if (!isAuth) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
