import { FormEvent, useCallback, useReducer } from "react";

import Input from "../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";

import "./NewPlaces.css";
import Button from "../../../shared/components/FormElements/Button/Button";
import formReducer, { InputName } from "./formReducer";

const NewPlaces = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback(
    (id: InputName, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value,
        isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  const placeSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id={InputName.title}
        elementProps="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please enter a valid title"
      />
      <Input
        id={InputName.description}
        elementProps="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        errorText="Please enter a valid description (at least 5 characters)."
      />
      <Input
        id={InputName.address}
        elementProps="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please enter a valid address"
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlaces;
