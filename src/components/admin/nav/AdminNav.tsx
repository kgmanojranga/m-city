import { Link } from "react-router-dom";
import { ListItem } from "@mui/material";
import { handleLogOut } from "../../utils/tools";
// import { auth } from "../../../firebase-config";
// import { showErrorToast, showSuccessToast } from "../../utils/tools";

type AdminLink = {
  title: string;
  linkTo: string;
};

function AdminNav() {
  const links: AdminLink[] = [
    {
      title: "Matches",
      linkTo: "admin-matches"
    },
    {
      title: "Players",
      linkTo: "admin-players"
    }
  ];

  function renderItems() {
    return links.map((link) => (
      <Link to={`/${link.linkTo}`} key={link.title}>
        <ListItem className="admin_nav_link">{link.title}</ListItem>
      </Link>
    ));
  }
  return (
    <div>
      {renderItems()}
      <ListItem
        button
        onClick={() => handleLogOut()}
        className="admin_nav_link"
      >
        Log Out
      </ListItem>
    </div>
  );
}

export { AdminNav };
