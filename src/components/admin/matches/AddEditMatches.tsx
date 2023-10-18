import { useEffect, useState } from "react";
import { AdminLayout } from "../../../hoc";

import { useNavigate, useParams } from "react-router-dom";

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
import { MatchesType, TeamsType } from "../../../temp/m-city-export";
import { doc, getDoc, getDocs } from "firebase/firestore";

const defaultValues: MatchesType = {
  id: "",
  date: "",
  local: "",
  localThmb: "",
  resultLocal: "",
  away: "",
  awayThmb: "",
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
  const [values, setValues] = useState<MatchesType>(defaultValues);

  const { matchid } = useParams();
  const navigate = useNavigate();

  console.log(values);

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
    onSubmit: (values: MatchesType) => {
      //submit form
      console.log(values);
    }
  });

  async function getTeams() {
    try {
      const currentTeams: TeamsType[] = [];
      const teamsSnapShot = await getDocs(teamsCollection);
      teamsSnapShot.forEach((team) => {
        currentTeams.push({ ...team.data(), id: team.id } as TeamsType);
      });
      setTeams(currentTeams);
    } catch (error) {
      showErrorToast("Error loading data");
      console.log(error);
    }
  }

  async function getMatches() {
    try {
      const matchRef = doc(matchesCollection, matchid);
      const matchSnapShot = await getDoc(matchRef);
      setValues({
        ...matchSnapShot.data(),
        id: matchSnapShot.id
      } as MatchesType);
    } catch (error) {
      console.log(error);
      showErrorToast("Error loading matches");
    }
  }

  function teamsMenuItems() {
    const teamsMenu = teams?.map((team) => (
      <MenuItem key={team.id} value={team.shortName}>
        {team.name}
      </MenuItem>
    ));

    return teamsMenu;
  }

  useEffect(() => {
    if (!teams) {
      getTeams();
    }
  }, [teams]);

  useEffect(() => {
    if (matchid) {
      setFormType("edit");
      getMatches();
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [matchid]);

  console.log(formik.getFieldProps("local"));

  return (
    <AdminLayout title={formType === "add" ? "Add Match" : "Edit Match"}>
      <div className="editmatch_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <h4>Select Date</h4>
              <FormControl>
                <TextField
                  id="date"
                  type="date"
                  {...formik.getFieldProps("date")}
                  {...textErrorHelper(formik, "date")}
                />
              </FormControl>
            </div>
            <hr />
            <div>
              <h4>Result Local</h4>
              <FormControl error={selectIsError(formik, "local")}>
                <Select
                  id="local"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("local")}
                >
                  <MenuItem value="" disabled>
                    Select a team
                  </MenuItem>
                  {teamsMenuItems()}
                </Select>
                {seletctErrorHelper(formik, "local")}
              </FormControl>
              <FormControl style={{ marginLeft: "10px" }}>
                <TextField
                  id="resultLocal"
                  type="number"
                  variant="outlined"
                  {...formik.getFieldProps("resultLocal")}
                  {...textErrorHelper(formik, "resultLocal")}
                />
              </FormControl>
            </div>
            <div>
              <h4>Result Away</h4>
              <FormControl error={selectIsError(formik, "local")}>
                <Select
                  id="away"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("away")}
                >
                  <MenuItem value="" disabled>
                    Select a team
                  </MenuItem>
                  {teamsMenuItems()}
                </Select>
                {seletctErrorHelper(formik, "away")}
              </FormControl>
              <FormControl style={{ marginLeft: "10px" }}>
                <TextField
                  id="resultAway"
                  type="number"
                  variant="outlined"
                  {...formik.getFieldProps("resultAway")}
                  {...textErrorHelper(formik, "resultAway")}
                />
              </FormControl>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export { AddEditMatches };
