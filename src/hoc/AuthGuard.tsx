import { ReactNode, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// import { auth } from "../firebase-config";

import { User } from "firebase/auth";

interface AuthRouteProps {
  children: ReactNode;
  user: User | null;
}

function AuthGuard({ children, user }: AuthRouteProps) {
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user) {
        navigate("/sign-in");
        return;
      }
    },
    [navigate, user]
  );

  return <>{user ? <>{children}</> : null}</>;
}

export { AuthGuard };
