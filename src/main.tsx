// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./app.css";
// import { auth } from "./firebase-config.tsx";
// import { onAuthStateChanged } from "firebase/auth";

// onAuthStateChanged(auth, (user) => {
//   ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//       <App user={user} />
//     </React.StrictMode>
//   );
// });

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
