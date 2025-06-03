import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoute = ({ children }) => {
  const token = Cookies.get("authToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const HrPrivateRoute = ({ children }) => {
  const token = Cookies.get("hrToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const CompanyPrivateRoute = ({ children }) => {
  const token = Cookies.get("companyToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const AdminPrivateRoute = ({ children }) => {
  const token = Cookies.get("adminToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};