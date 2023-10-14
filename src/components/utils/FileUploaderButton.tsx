import { ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { storage } from "../config/firebase-config";
import { v4 } from "uuid";
import { showErrorToast, showSuccessToast } from "./tools";

type StateType = {
  name: string[];
  isUploading: boolean;
  fileURL: string;
};

const initialState: StateType = {
  name: [],
  isUploading: false,
  fileURL: ""
};

function FileUploaderButton() {
  const [state, setState] = useState<StateType>(initialState);

  console.log(state);
  async function handleStartUpload(event: ChangeEvent<HTMLInputElement>) {
    const uploadingFiles = event.target.files;

    if (uploadingFiles) {
      setState((prevState) => {
        return { ...prevState, isUploading: true };
      });
      try {
        for (let i = 0; i < uploadingFiles.length; i++) {
          const imageRef = ref(
            storage,
            `images/${uploadingFiles[i]?.name}` + v4()
          );
          await uploadBytes(imageRef, uploadingFiles[i]);
        }

        handleUploadSuccess(uploadingFiles);
      } catch (err) {
        handleErrorUpload(err);
      }
    }
  }

  function handleErrorUpload(err: unknown) {
    showErrorToast(`Error Uploading: ${err}`);
    setState((prevState) => {
      return { ...prevState, isUploading: false };
    });
  }

  function handleUploadSuccess(files: FileList) {
    showSuccessToast(
      `Image${files.length > 1 ? "s" : null} Uploaded Successfully`
    );

    const name: string[] = [];

    for (const file of files) {
      name.push(file.name);
    }

    setState((prevState) => {
      return { ...prevState, isUploading: false, name: name };
    });
  }

  return (
    <div>
      <input
        accept="image/*"
        type="file"
        onChange={(event) => handleStartUpload(event)}
      />
    </div>
  );
}

export { FileUploaderButton };
