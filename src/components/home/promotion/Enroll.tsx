import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { showErrorToast, showSuccessToast } from "../../utils/tools";
import { db, promotionsCollection } from "../../config/firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

function Enroll() {
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("The email is required")
    }),
    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    }
  });

  const submitForm = async (values: { email: string }) => {
    const emailArray: string[] = [];
    try {
      const isOnTheList = collection(db, "promotions");
      const emailQuery = query(isOnTheList, where("email", "==", values.email));
      const querySnapShot = await getDocs(emailQuery);
      querySnapShot.forEach((doc) => {
        emailArray.push(doc.data().email);
      });

      if (emailArray.length >= 1) {
        showErrorToast("sorry you are on the list already");
        return;
      } else {
        await addDoc(promotionsCollection, { email: values.email });
        showSuccessToast(
          "Congratulations...!. You have been added to the list"
        );
      }
    } catch (err) {
      showErrorToast(err as string);
    } finally {
      formik.resetForm();
      setLoading(false);
    }
  };

  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error_label">{formik.errors.email}</div>
            ) : null}

            {loading ? (
              <CircularProgress color="secondary" className="progress" />
            ) : (
              <button type="submit">Enroll</button>
            )}
            <div className="enroll_discl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              dicta porro repellendus vitae unde consectetur ullam veritatis
              suscipit. Laudantium quas at, vero eos exercitationem quos ad
              possimus tenetur ex explicabo.
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
}

export { Enroll };
