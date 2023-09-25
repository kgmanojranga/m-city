import React from "react";

import { Link } from "react-router-dom";

import mcitylogo from "../../../public/images/logos/manchester_city_logo.png";

type CityLogoProps = {
  link: boolean;
  linkTo: string;
  width: string;
  height: string;
};

function CityLogo({ link, linkTo, width, height }: CityLogoProps) {
  const template: React.ReactNode = (
    <div
      className="img_cover"
      style={{
        width: width,
        height: height,
        background: `url(${mcitylogo}) no-repeat`,
      }}
    ></div>
  );

  if (link) {
    return <Link to={linkTo}>{template}</Link>;
  } else {
    return template;
  }
}

export { CityLogo };
