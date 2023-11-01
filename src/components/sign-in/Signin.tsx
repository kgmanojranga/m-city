//React-library
import { useState } from "react";

//React-router-dom-library
import { useNavigate } from "react-router-dom";

//Material-ui-library
import { CircularProgress } from "@mui/material";

//Formik-library
import { useFormik } from "formik";

//Yup-library
import * as Yup from "yup";

//Firebase-library
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";

//Toastify-library
import { showSuccessToast, showErrorToast } from "../utils/tools";
import { useAuthStore } from "../../store/auth.store";

interface AuthCredential {
  email: string;
  password: string;
}

function Signin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "francis@gmail.com",
      password: "testing123"
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("The email is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: (values: AuthCredential) => {
      setIsLoading(true);
      handleSubmit(values);
    }
  });

  async function handleSubmit(values: AuthCredential) {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      showSuccessToast("Logged Successfully");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      showErrorToast("Error Login");
    }
  }

  return (
    <>
      {!user ? (
        <div className="container">
          <div className="signin_wrapper" style={{ margin: "100px" }}>
            <form onSubmit={formik.handleSubmit}>
              <h2>Please Login</h2>
              <input
                name="email"
                placeholder="E-mail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {!!formik.touched.email && formik.errors.email ? (
                <div className="error_label">{formik.errors.email}</div>
              ) : null}
              <input
                name="password"
                placeholder="Enter your password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error_label">{formik.errors.password}</div>
              ) : null}

              {isLoading ? (
                <CircularProgress color="secondary" className="progress" />
              ) : (
                <button type="submit">Log in</button>
              )}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export { Signin };
