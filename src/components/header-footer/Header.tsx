import { AppBar, Toolbar, Button } from "@mui/material";

import { CityLogo, showErrorToast, showSuccessToast } from "../utils/tools";
import { UserType } from "../types";

import { Link } from "react-router-dom";

//Firebase-library
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

function Header({ user }: UserType) {
  async function handleLogOut() {
    try {
      await signOut(auth);
      showSuccessToast("Good Bye");
    } catch (error) {
      showErrorToast("Error Signing Out");
    }
  }

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
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export { Header };
