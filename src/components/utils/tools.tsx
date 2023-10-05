import React from "react";

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

export { CityLogo, showErrorToast, showSuccessToast, handleLogOut };
