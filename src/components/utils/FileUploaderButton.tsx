import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { storage } from "../config/firebase-config";
import { v4 } from "uuid";
import { showErrorToast, showSuccessToast } from "./tools";
import { CircularProgress } from "@mui/material";

type StateType = {
  name: string;
  currentName: string;
  isUploading: boolean;
  fileURL: string;
};

const initialState: StateType = {
  name: "",
  currentName: "",
  isUploading: false,
  fileURL: ""
};

function FileUploaderButton({
  randomizeFilename,
  filename
}: {
  randomizeFilename: boolean;
  filename: (name: string) => void;
}) {
  const [state, setState] = useState<StateType>(initialState);

  console.log(state);

  const getRandomizeFilename = useCallback(
    function getRandomizeFilename() {
      if (randomizeFilename) {
        setState((prevState) => {
          return { ...prevState, currentName: v4() };
        });
      }
    },
    [randomizeFilename]
  );
  async function handleStartUpload(event: ChangeEvent<HTMLInputElement>) {
    const uploadingFiles = event.target.files;

    if (uploadingFiles) {
      try {
        setState((prevState) => {
          return { ...prevState, isUploading: true };
        });

        // for (let i = 0; i < uploadingFiles.length; i++) {
        //   const imageRef = ref(
        //     storage,
        //     `players/${
        //       randomizeFilename ? state.name : uploadingFiles[i]?.name
        //     }`
        //   );
        //   setState((prevState) => {
        //     return { ...prevState, name: uploadingFiles[i]?.name };
        //   });
        //   await uploadBytes(imageRef, uploadingFiles[i]);
        // }

        const imageRef = ref(
          storage,
          `players/${
            randomizeFilename ? state.currentName : uploadingFiles[0]?.name
          }`
        );
        await uploadBytes(imageRef, uploadingFiles[0]);

        handleUploadSuccess(uploadingFiles);
      } catch (err) {
        handleErrorUpload(err);
      }
    }
  }

  function handleErrorUpload(err: unknown) {
    showErrorToast(`Error Uploading: ${err}`);
    setState((prevState) => {
      return {
        ...prevState,
        isUploading: false,
        name: "",
        fileURL: "",
        currentName: ""
      };
    });
  }

  async function handleUploadSuccess(files: FileList) {
    showSuccessToast(
      `Image${files.length > 1 ? "s" : ""} Uploaded Successfully`
    );

    const imageName = randomizeFilename ? state.currentName : files[0]?.name;

    filename(imageName);

    const imageRef = ref(storage, `players/${imageName}`);

    const url = await getDownloadURL(imageRef);
    setState((prevState) => {
      return {
        ...prevState,
        isUploading: false,
        name: imageName,
        currentName: "",
        fileURL: url
      };
    });
  }

  useEffect(
    function () {
      getRandomizeFilename();
    },
    [getRandomizeFilename]
  );
  return (
    <div>
      {state.fileURL ? (
        <div className="image_upload_container">
          <img style={{ width: "100%" }} src={state.fileURL} alt={state.name} />
          <div className="remove" onClick={() => alert("remove")}>
            Remove
          </div>
        </div>
      ) : (
        <div>
          <input
            accept="image/*"
            type="file"
            onChange={(event) => handleStartUpload(event)}
          />
        </div>
      )}
      {state.isUploading ? (
        <div
          className="progress"
          style={{ textAlign: "center", margin: "30px 0" }}
        >
          <CircularProgress style={{ color: "#98c6e9" }} thickness={7} />
        </div>
      ) : null}
    </div>
  );
}

export { FileUploaderButton };
