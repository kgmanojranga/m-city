import React, { ReactNode } from "react";

import { Link } from "react-router-dom";

import mcitylogo from "../../../public/images/logos/manchester_city_logo.png";

import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

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
        background: `url(${mcitylogo}) no-repeat`
      }}
    ></div>
  );

  if (link) {
    return <Link to={linkTo}>{template}</Link>;
  } else {
    return template;
  }
}

export const Tag = ({
  children,
  link,
  bck = "#fff",
  size = "15px",
  add
}: {
  children: ReactNode;
  link?: string;
  linkTo?: string;
  bck?: string;
  size?: string;
  add?: React.CSSProperties;
}) => {
  const template = (
    <div
      style={{
        background: bck,
        fontSize: size,
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...add
      }}
    >
      {children}
    </div>
  );

  if (link) {
    return (
      <Link className="link_logo" to={link}>
        {template}
      </Link>
    );
  }

  return template;
};

function showErrorToast(msg: string) {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
    autoClose: 2000
    // theme: "colored"
  });
}

function showSuccessToast(msg: string) {
  toast.success(msg, {
    position: toast.POSITION.TOP_LEFT,
    autoClose: 2000
    // theme: "colored"
  });
}

async function handleLogOut() {
  try {
    await signOut(auth);
    showSuccessToast("Good Bye");
  } catch (error) {
    showErrorToast("Error Signing Out");
  }
}

export { CityLogo };
export { showErrorToast, showSuccessToast, handleLogOut };
