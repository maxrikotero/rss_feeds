import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../features/userSlide";
import useYupValidationSchema from "../hooks/useYupValidationSchema";
import apiCall from "../utils/apiCall";
import "./Login.css";

const Login = () => {
  const [state, setState] = useState({});
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    user: yup.string().required("user is Required"),
    password: yup.string().required("password is Required"),
  });

  const { handleValidateSchema, validationMessages } = useYupValidationSchema(
    schema
  );

  const handleChange = ({ target: { name, value } }) => {
    setState((prev) => {
      handleValidateSchema({ ...state, [name]: value }); // This an async function which will evaluate if the schema is valid
      return { ...prev, [name]: value };
    });
  };

  const { user, password } = state;

  const handleSave = async (e) => {
    // Sent to create a new user
    const { isValid } = handleValidateSchema(state); // This an async function which will evaluate if the schema is valid
    // I made this here because i wanna be sure it is valid

    if (isValid) {
      var response = await apiCall({
        url: "users/register",
        method: "POST",
        body: JSON.stringify(state),
      });
      if (response?.user_id) {
        dispatch(login({ ...response }));
      } else {
        toast.error(response?.message || "Unable to add a new user");
      }
    }
  };

  const signIn = async () => {
    const { isValid } = handleValidateSchema(state); // This an async function which will evaluate if the schema is valid

    if (isValid) {
      var response = await apiCall({
        url: "users/login",
        method: "POST",
        body: JSON.stringify(state),
      });

      if (response?.user_id) {
        localStorage.setItem("token", response.access_token);
        dispatch(login({ ...response }));
      } else {
        toast.error("User or Password are invalid");
      }
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <TextField
          label="User"
          name="user"
          error={Boolean(validationMessages?.user)}
          style={{ marginBottom: "20px" }}
          onChange={handleChange}
          value={user}
          helperText={
            Boolean(validationMessages?.user) ? "User is required" : ""
          }
        />
        <TextField
          label="Password"
          error={Boolean(validationMessages?.password)}
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          helperText={
            Boolean(validationMessages?.password) ? "Password is Password" : ""
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={signIn}
          style={{ marginTop: "20px" }}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: "20px" }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Login;
