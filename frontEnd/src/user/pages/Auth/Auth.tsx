import { FormEvent, useContext, useState } from "react";
import Button from "../../../shared/components/FormElements/Button/Button";
import Input from "../../../shared/components/FormElements/Input/Input";
import { useForm } from "../../../shared/hooks/form-hooks/form-hooks";
import { AuthInputs, InputName } from "../../../shared/hooks/form-hooks/types";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";

import "./Auth.css";
import Card from "../../../shared/components/UIElements/Card/Card";
import { AuthContext } from "../../../shared/context/auth-context";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
const Auth = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [{ inputs, isValid }, inputHandler, setFormData] = useForm<AuthInputs>(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isLoginMode) {
        await sendRequest({
          url: "http://localhost:5000/api/users/login",
          method: "POST",
          body: JSON.stringify({
            email: inputs.email.value,
            password: inputs.password.value,
          }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await sendRequest({
          url: "http://localhost:5000/api/users/signup",
          method: "POST",
          body: JSON.stringify({
            email: inputs.email.value,
            password: inputs.password.value,
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
      
      login();
    } catch (err) {console.log(err);}
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...inputs,
          name: undefined,
        },
        inputs.email.isValid && inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id={InputName.name}
              elementProps="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Please enter a name"
            />
          )}
          <Input
            id={InputName.email}
            elementProps="input"
            type="text"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorText="Please enter a valid email address"
          />
          <Input
            id={InputName.password}
            elementProps="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            errorText="Please enter a valid password  (at least 5 characters)"
          />
          <Button type="submit" disabled={!isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {!isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
