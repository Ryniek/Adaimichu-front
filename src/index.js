import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./components/login/Login";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import store from "./store/store";
import { Provider } from "react-redux";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import DrawnTasks from "./components/tasks/DrawnTasks";
import FinishedTasks from "./components/tasks/FinishedTasks";
import OwnTasks from "./components/tasks/OwnTasks";
import TopNav from "./components/navigation/TopNav";
import EditProfile from "./components/profile/EditProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ResetPassword from "./components/login/ResetPassword";
import SetPassword from "./components/login/SetPassword";
import AdminPanel from "./components/admin/AdminPanel";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <TopNav></TopNav>
        <AdminPanel></AdminPanel>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/owned" element={<OwnTasks />}></Route>
          <Route path="/drawn" element={<DrawnTasks />}></Route>
          <Route path="/finished" element={<FinishedTasks />}></Route>
          <Route path="/profile" element={<EditProfile />}></Route>
          <Route path="/remind" element={<ResetPassword />}></Route>
          <Route path="/reset" element={<SetPassword />}></Route>
        </Routes>
        <ToastContainer autoClose={2500}/>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
