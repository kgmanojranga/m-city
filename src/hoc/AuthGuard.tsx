import { User } from "firebase/auth";
import { ReactNode, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// import { auth } from "../firebase-config";

interface AuthGuardProps {
  children: ReactNode;
  user: User | null;
}

function AuthGuard({ children, user }: AuthGuardProps) {
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user) {
        navigate("/sign-in");
        return;
      } else {
        return;
      }
    },
    [navigate, user, children]
  );

  return <>{user ? <>{children}</> : null}</>;
}

export { AuthGuard };
