import { User } from "firebase/auth";
import { ReactNode, createContext, useEffect, useMemo } from "react";
import { useAuthStore } from "../../store/auth.store";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

interface AuthContextState {
  user: User | null;
}

export const AuthContext = createContext<AuthContextState>({
  user: null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      user,
      setUser
    }),
    [user, setUser]
  );

  useEffect(
    function () {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
          navigate("/sign-in");
        }
      });
    },
    [navigate, children, setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
