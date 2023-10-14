// import { ref } from "firebase/storage";
import { useState } from "react";
import { FileUploaderButton } from "./FileUploaderButton";

// import FileUploader from "react-firebase-file-uploader";
// import { storage } from "../config/firebase-config";

type StateType = {
  name: string;
  isUploading: boolean;
  fileURL: string;
};

const initialState: StateType = {
  name: "",
  isUploading: false,
  fileURL: ""
};

function FirebaseFileUploader({ dir }: { dir: string }) {
  const [state, setState] = useState<StateType>(initialState);

  //   function handleUploadStart() {
  //     setState((preState) => {
  //       return { ...preState, isUploading: true };
  //     });
  //   }
  //   function handleUploadError(error: string) {
  //     console.log(error);
  //     setState((preState) => {
  //       return { ...preState, isUploading: false };
  //     });
  //   }
  //   function handleUploadSuccess(filename: string) {
  //     setState((preState) => {
  //       return { ...preState, name: filename, isUploading: false };
  //     });
  //   }

  console.log(state);

  return (
    <div>
      <div>
        <FileUploaderButton
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={ref(storage, dir)}
          onUploadStart={() => handleUploadStart()}
          onUploadError={(error: string) => handleUploadError(error)}
          onUploadSuccess={(filename: string) => handleUploadSuccess(filename)}
        >
          Hi
        </FileUploaderButton>
      </div>
    </div>
  );
}

export { FirebaseFileUploader };
