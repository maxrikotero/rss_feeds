import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { selectUser, logout, login } from "./features/userSlide";
import HomeScreen from "./containers/HomeScreen"; // Todo review name
import Login from "./containers/Login"; // Todo review name
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) dispatch(logout());
    else dispatch(login({ access_token: localStorage.getItem("token") }));
  }, []);

  return (
    <div className="App">
      {(user && (
        <Router>
          <Switch>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
        </Router>
      )) || <Login />}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default App;
