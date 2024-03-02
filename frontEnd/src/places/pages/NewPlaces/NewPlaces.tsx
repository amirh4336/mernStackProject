import { FormEvent } from "react";

import Input from "../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";

import "./NewPlaces.css";
import Button from "../../../shared/components/FormElements/Button/Button";
import { AddInputs, InputName } from "../../../shared/hooks/formReducer";
import { useForm } from "../../../shared/hooks/form-hooks";

const NewPlaces = () => {
  const [formState, inputHandler] = useForm<AddInputs>(
    {
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
    false
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
