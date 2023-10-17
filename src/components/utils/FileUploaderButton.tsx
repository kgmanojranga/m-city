import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { storage } from "../../config/firebase-config";
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
  filename,
  defaultImgURL,
  defaultImgName,
  dir,
  resetImage
}: {
  randomizeFilename: boolean;
  filename: (name: string) => void;
  defaultImgURL: string;
  defaultImgName: string;
  dir: string;
  resetImage: () => void;
}) {
  const [state, setState] = useState<StateType>(initialState);

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
        //     `${dir}/${
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
          `${dir}/${
            randomizeFilename
              ? state.currentName +
                "." +
                uploadingFiles[0].name.split(".").at(-1)
              : uploadingFiles[0]?.name
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

    const imageName = randomizeFilename
      ? state.currentName + "." + files[0].name.split(".").at(-1)
      : files[0]?.name;

    filename(imageName);

    const imageRef = ref(storage, `${dir}/${imageName}`);

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

      if (defaultImgURL && defaultImgName) {
        setState((prevState) => {
          return { ...prevState, name: defaultImgName, fileURL: defaultImgURL };
        });
      } else {
        setState((prevState) => {
          return { ...prevState, name: "", fileURL: "" };
        });
      }
    },
    [getRandomizeFilename, defaultImgName, defaultImgURL]
  );
  return (
    <div>
      {state.fileURL ? (
        <div className="image_upload_container">
          <img style={{ width: "100%" }} src={state.fileURL} alt={state.name} />
          <div className="remove" onClick={() => resetImage()}>
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
