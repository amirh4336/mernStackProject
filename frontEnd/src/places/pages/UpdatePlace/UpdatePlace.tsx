import { useParams } from "react-router-dom";
import "./UpdatePlace.css";
import { DUMMY_PLACES } from "../UserPlaces";
import Input from "../../../shared/components/FormElements/Input/Input";
import { EditInputs, InputName } from "../../../shared/hooks/formReducer";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import Button from "../../../shared/components/FormElements/Button/Button";
import { useForm } from "../../../shared/hooks/form-hooks";
import { FormEvent } from "react";
const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  const [{ inputs, isValid }, inputHandler] = useForm<EditInputs>(
    {
      title: {
        value: identifedPlace?.title || "",
        isValid: true,
      },
      description: {
        value: identifedPlace?.description || "",
        isValid: true,
      },
    },
    true
  );

  const updatePlaceSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);
  };

  if (!identifedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
      <Input
        id={InputName.title}
        elementProps="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={inputs.title.value}
        initialValid={inputs.title.isValid}
      />
      <Input
        id={InputName.description}
        elementProps="input"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={inputs.description.value}
        initialValid={inputs.description.isValid}
      />
      <Button type="submit" disabled={!isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
