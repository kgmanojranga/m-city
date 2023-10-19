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
import { addDoc, doc, getDoc, getDocs } from "firebase/firestore";

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
      submitForm(values);
    }
  });

  async function submitForm(values: MatchesType) {
    try {
      const dataToSubmit = values;

      dataToSubmit.awayThmb =
        teams?.filter((team) => team.shortName === values.away)[0].thmb || "";

      dataToSubmit.localThmb =
        teams?.filter((team) => team.shortName === values.local)[0].thmb || "";

      setLoading(true);

      if (formType === "add") {
        await addDoc(matchesCollection, dataToSubmit);
        showSuccessToast("Match added successfully");
        formik.resetForm();
      } else {
        console.log(formType);
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Error uploding the data");
    } finally {
      setLoading(false);
    }
  }

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
                  // type="number"
                  variant="outlined"
                  {...formik.getFieldProps("resultLocal")}
                  {...textErrorHelper(formik, "resultLocal")}
                />
              </FormControl>
            </div>
            <div>
              <h4>Result Away</h4>
              <FormControl error={selectIsError(formik, "away")}>
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
                  // type="number"
                  variant="outlined"
                  {...formik.getFieldProps("resultAway")}
                  {...textErrorHelper(formik, "resultAway")}
                />
              </FormControl>
            </div>
            <hr />
            <div>
              <h4>Match Info</h4>
              <div className="mb-5">
                <FormControl>
                  <TextField
                    id="referee"
                    variant="outlined"
                    placeholder="Add the referee name"
                    {...formik.getFieldProps("referee")}
                    {...textErrorHelper(formik, "referee")}
                  />
                </FormControl>
              </div>
              <div className="mb-5">
                <FormControl>
                  <TextField
                    id="stadium"
                    variant="outlined"
                    placeholder="Add the stadium name"
                    {...formik.getFieldProps("stadium")}
                    {...textErrorHelper(formik, "stadium")}
                  />
                </FormControl>
              </div>
              <div className="mb-5">
                <FormControl error={selectIsError(formik, "result")}>
                  <Select
                    id="result"
                    variant="outlined"
                    displayEmpty
                    {...formik.getFieldProps("result")}
                  >
                    <MenuItem value="" disabled>
                      Select a result
                    </MenuItem>
                    <MenuItem value="W">Win</MenuItem>
                    <MenuItem value="L">Loose</MenuItem>
                    <MenuItem value="D">Draw</MenuItem>
                    <MenuItem value="n/a">Not available</MenuItem>
                  </Select>
                  {seletctErrorHelper(formik, "result")}
                </FormControl>
              </div>
              <div className="mb-5">
                <FormControl error={selectIsError(formik, "final")}>
                  <Select
                    id="final"
                    variant="outlined"
                    displayEmpty
                    {...formik.getFieldProps("final")}
                  >
                    <MenuItem value="" disabled>
                      Was the game played
                    </MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                  {seletctErrorHelper(formik, "final")}
                </FormControl>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {formType === "add" ? "Add Match" : "Edit Match"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export { AddEditMatches };
