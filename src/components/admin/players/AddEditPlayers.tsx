import { useEffect, useState } from "react";
import { AdminLayout } from "../../../hoc";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import * as Yup from "yup";

import {
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
  seletctErrorHelper,
  selectIsError
} from "../../utils/tools";
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

function AddEditPlayers() {
  const [formType, setFormType] = useState<string>("");
  const [values, setValues] = useState<ValueType>(defaultValue);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      lastName: Yup.string().required("This input is required"),
      number: Yup.number()
        .required("This is required")
        .min(0, "The minimum is zero")
        .max(100, "The max is 100"),
      position: Yup.string().required("This is required")
    }),
    onSubmit: () => {}
  });

  //   useEffect(() => {
  //     const param = user.params.playerid;
  //     if (param) {
  //       setFormType("edit");
  //       //   setValues();
  //     } else {
  //       setFormType("add");
  //       setValues(defaultValue);
  //     }
  //   }, [match.params.playerid]);

  return (
    <AdminLayout title={formType === "add" ? "Add Player" : "Edit Player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            image
            <hr />
            <h4>Player Info</h4>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="name"
                  variant="outlined"
                  placeholder="Add First Name"
                  {...formik.getFieldProps("name")}
                  {...textErrorHelper(formik, "name")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="lastName"
                  variant="outlined"
                  placeholder="Add Last Name"
                  {...formik.getFieldProps("lastName")}
                  {...textErrorHelper(formik, "lastName")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="number"
                  variant="outlined"
                  placeholder="Number"
                  {...formik.getFieldProps("number")}
                  {...textErrorHelper(formik, "number")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl error={selectIsError(formik, "position")}>
                <Select
                  id="position"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("position")}
                >
                  <MenuItem value="" disabled>
                    Select a opposition
                  </MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="Midfield">Mid Field</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
                </Select>
                {seletctErrorHelper(formik, "position")}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {formType === "add" ? "Add Player" : "Edit Player"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export { AddEditPlayers };
