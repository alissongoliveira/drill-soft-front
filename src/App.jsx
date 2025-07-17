import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Login />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
