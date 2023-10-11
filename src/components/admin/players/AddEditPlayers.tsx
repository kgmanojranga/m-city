import { useEffect, useState } from "react";
import { AdminLayout } from "../../../hoc";
import { useFormik } from "formik";
import * as Yup from "yup";

import { showErrorToast, showSuccessToast } from "../../utils/tools";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button
} from "@mui/material";

import { playersCollection } from "../../config/firebase-config";

type ValueType = {
  name: string;
  lastName: string;
  number: string;
  position: string;
};

const defaultValue: ValueType = {
  name: "",
  lastName: "",
  number: "",
  position: ""
};

function AddEditPlayers({ match }) {
  const [formType, setFormType] = useState<string>("");
  const [values, setValues] = useState<ValueType>(defaultValue);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      lastName: Yup.string().required("This input is required"),
      number: Yup.string()
        .required("This is required")
        .min(0, "The minimum is zero")
        .max(100, "The max is 100"),
      position: Yup.string().required("This is required")
    }),
    onSubmit: () => {}
  });

  useEffect(() => {
    const param = match.params.playerid;
    if (param) {
      setFormType("edit");
      //   setValues();
    } else {
      setFormType("add");
      setValues(defaultValue);
    }
  }, [match.params.playerId]);
  return <AdminLayout title="Add Players">Content</AdminLayout>;
}

export { AddEditPlayers };
