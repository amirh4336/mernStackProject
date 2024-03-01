import { useCallback } from "react";

import Input from "../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";

import "./NewPlaces.css";
const NewPlaces = () => {
  const titleInputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {},
    []
  );
  const descriptionInputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {},
    []
  );

  return (
    <form className="place-form">
      <Input
        id="title"
        elementProps="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={titleInputHandler}
        errorText="Please enter a valid title"
      />
      <Input
        id="description"
        elementProps="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={descriptionInputHandler}
        errorText="Please enter a valid description (at least 5 characters)."
      />
    </form>
  );
};

export default NewPlaces;
