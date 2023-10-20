import { AppBar, Toolbar, Button } from "@mui/material";

import { CityLogo, handleLogOut } from "../utils/tools";
import { UserType } from "../../types/types";

import { Link, useNavigate } from "react-router-dom";

function Header({ user }: UserType) {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#98c5e9",
        boxShadow: "none",
        padding: "10px 0",
        borderBottom: "2px solid #00285e"
      }}
    >
      <Toolbar style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <div className="header_logo">
            <CityLogo link={true} linkTo={"/"} width="70px" height="70px" />
          </div>
        </div>
        <Link to="/the-team">
          <Button color="inherit">The team</Button>
        </Link>
        <Link to="/the-matches">
          <Button color="inherit">Matches</Button>
        </Link>
        {user ? (
          <>
            <Link to="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </Link>

            <Button color="inherit" onClick={() => handleLogOut()}>
              Log Out
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/sign-in")}>
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export { Header };
