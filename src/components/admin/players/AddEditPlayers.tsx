import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "../../../hoc";
import { useFormik } from "formik";
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

import { playersCollection, storage } from "../../../config/firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { FileUploaderButton } from "../../utils/FileUploaderButton";
import { getDownloadURL, ref } from "firebase/storage";

type ValueType = {
  name: string;
  lastname: string;
  number: string;
  position: string;
  image: string;
};

const defaultValue: ValueType = {
  name: "",
  lastname: "",
  number: "",
  position: "",
  image: ""
};

function AddEditPlayers() {
  const [formType, setFormType] = useState<string>("");
  const [values, setValues] = useState<ValueType>(defaultValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultImgURL, setDefaultImgURL] = useState<string>("");
  // const [resetImage, setResetImage] = useState<boolean>(false);

  const { playerid } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      lastname: Yup.string().required("This input is required"),
      number: Yup.number()
        .required("This is required")
        .min(0, "The minimum is zero")
        .max(100, "The max is 100"),
      position: Yup.string().required("This is required"),
      image: Yup.string().required("This is required")
    }),
    onSubmit: (values: ValueType) => {
      handleSubmit(values);
    }
  });

  async function handleSubmit(values: ValueType) {
    try {
      setLoading(true);
      if (formType === "add") {
        await addDoc(playersCollection, values);
        formik.resetForm();
        showSuccessToast("Player was added successfully");
        navigate("/admin-players");
      } else {
        const playerRef = doc(playersCollection, playerid);
        await updateDoc(playerRef, values);
        // formik.resetForm();
        showSuccessToast("Player was edited successfully");
        navigate("/admin-players");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const updateImageName = useCallback(function (filename: string) {
    formik.setFieldValue("image", filename);
  }, []);

  const getPlayer = useCallback(
    async function () {
      try {
        const playerRef = doc(playersCollection, playerid);
        const playerSnap = await getDoc(playerRef);
        if (playerSnap.exists()) {
          setFormType("edit");
          setValues(playerSnap.data() as ValueType);

          const imageRef = ref(storage, `players/${playerSnap.data().image}`);
          const url = await getDownloadURL(imageRef);

          updateImageName(playerSnap.data().image);
          setDefaultImgURL(url);
        } else {
          showErrorToast("Sorry, nothing was found");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [playerid, updateImageName]
  );

  // async function getPlayer() {
  //   try {
  //     const playerRef = doc(playersCollection, playerid);
  //     const playerSnap = await getDoc(playerRef);
  //     if (playerSnap.exists()) {
  //       const imageRef = ref(storage, `players/${playerSnap.data().image}`);
  //       const url = await getDownloadURL(imageRef);

  //       updateImageName(playerSnap.data().image);

  //       setDefaultImgURL(url);

  //       setFormType("edit");
  //       setValues(playerSnap.data() as ValueType);
  //     } else {
  //       showErrorToast("Sorry, nothing was found");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  function resetImageFunc() {
    console.log("in resetImage function");
    formik.setFieldValue("image", "");
    setDefaultImgURL("");
  }

  useEffect(() => {
    if (playerid) {
      getPlayer();
    } else {
      setFormType("add");
      setValues(defaultValue);
    }
  }, [playerid, getPlayer]);

  return (
    <AdminLayout title={formType === "add" ? "Add Player" : "Edit Player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <FormControl error={selectIsError(formik, "image")}>
              <FileUploaderButton
                randomizeFilename={true}
                defaultImgURL={defaultImgURL}
                filename={(filename: string) => updateImageName(filename)}
                defaultImgName={formik.values.image}
                dir="players"
                resetImage={() => resetImageFunc()}
              />
              {seletctErrorHelper(formik, "image")}
            </FormControl>
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
                  id="lastname"
                  variant="outlined"
                  placeholder="Add Last Name"
                  {...formik.getFieldProps("lastname")}
                  {...textErrorHelper(formik, "lastname")}
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
