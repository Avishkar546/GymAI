import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user, isLoading } = useAuth();
  if (user && !isLoading) {
    return <Navigate to="/profile" replace />;
  }

  return <div>Home Page</div>
};

export default Home;
