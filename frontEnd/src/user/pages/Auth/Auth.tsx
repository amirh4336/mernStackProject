import { FormEvent } from "react";
import Button from "../../../shared/components/FormElements/Button/Button";
import Input from "../../../shared/components/FormElements/Input/Input";
import { useForm } from "../../../shared/hooks/form-hooks/form-hooks";
import { AuthInputs, InputName } from "../../../shared/hooks/form-hooks/types";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";

import "./Auth.css";
import Card from "../../../shared/components/UIElements/Card/Card";
const Auth = () => {
  const [{ inputs, isValid }, inputHandler] = useForm<AuthInputs>(
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

  const authSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <Card className="authentication">
      <h2 >Login Required</h2>
      <hr />
      <form  onSubmit={authSubmitHandler}>
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
          LOGIN
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
