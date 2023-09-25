import { CityLogo } from "../utils/tools";

function Footer() {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link={true} linkTo={"/"} width="70px" height="70px" />
      </div>
      <div className="footer_descl">
        Manchester city 2023. All rights reserved
      </div>
    </footer>
  );
}

export { Footer };
