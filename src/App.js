import "./App.css";
import Navbar from "./Components/NavbarComponent/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNote from "./Components/createnote/CreateNote";
import { ToastContainer } from "react-toastify";
import ViewNote from "./Components/viewnote/ViewNote";
import { useState } from "react";
import axios from "axios";
import Login from "./Components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("/api/view");
    setBlogs(data);
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/blogs"
          element={
            <div className="App">
              {" "}
              <ToastContainer /> <CreateNote />{" "}
            </div>
          }
        />

        <Route
          path="/view"
          element={
            <ViewNote appBlogs={blogs} setBlogs={setBlogs} getData={getData} />
          }
        />
        <Route
          exact
          path="/edit/:id"
          element={<CreateNote flag={true} blogs={blogs} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
