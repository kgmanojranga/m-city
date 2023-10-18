import { useEffect, useState } from "react";
import { AdminLayout } from "../../../hoc";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  textErrorHelper,
  showErrorToast,
  showSuccessToast,
  selectIsError,
  seletctErrorHelper
} from "../../utils/tools";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button
} from "@mui/material";

import {
  matchesCollection,
  teamsCollection
} from "../../../config/firebase-config";
import { TeamsType } from "../../../temp/m-city-export";

type ValueType = {
  date: string;
  local: string;
  resultLocal: string;
  away: string;
  referee: string;
  resultAway: string;
  stadium: string;
  final: string;
  result: string;
};

const defaultValues: ValueType = {
  date: "",
  local: "",
  resultLocal: "",
  away: "",
  referee: "",
  resultAway: "",
  stadium: "",
  final: "",
  result: ""
};

function AddEditMatches() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("add");
  const [teams, setTeams] = useState<TeamsType[] | null>(null);
  const [values, setValuse] = useState<ValueType>(defaultValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      date: Yup.string().required("This is required"),
      local: Yup.string().required("This is required"),
      resultLocal: Yup.number()
        .required("This is required")
        .min(0, "The minimum is Zero")
        .max(100, "The maximum is 100"),
      away: Yup.string().required("This is required"),
      resultAway: Yup.number()
        .required("This is required")
        .min(0, "The minimum is Zero")
        .max(100, "The maximum is 100"),
      referee: Yup.string().required("This is required"),
      stadium: Yup.string().required("This is required"),
      result: Yup.mixed()
        .required("This is required")
        .oneOf(["W", "D", "L", "n/a"]),
      final: Yup.mixed().required("This is required").oneOf(["Yes", "No"])
    }),
    onSubmit: (values: ValueType) => {
      //submit form
      console.log(values);
    }
  });

  return <>Matches</>;
}

export { AddEditMatches };
