import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";

import "./NewPlaces.css";
import Button from "../../../shared/components/FormElements/Button/Button";
import { useForm } from "../../../shared/hooks/form-hooks/form-hooks";
import { AddInputs, InputName } from "../../../shared/hooks/form-hooks/types";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const NewPlaces = () => {
  const { userId } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const navigate = useNavigate();

  const placeSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendRequest({
        url: "http://localhost:5000/api/places",
        method: "POST",
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: userId,
        }),
        headers: { "Content-Type": "application/json" },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </>
  );
};

export default NewPlaces;
