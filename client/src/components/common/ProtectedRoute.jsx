import{Navigate} from'react-router-dom';
import { useAuthContext } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-pink-200">
        Checking authentication...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;
