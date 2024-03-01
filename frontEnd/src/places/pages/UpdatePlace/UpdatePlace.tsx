import { useParams } from "react-router-dom";
import "./UpdatePlace.css";
import { DUMMY_PLACES } from "../UserPlaces";
import Input from "../../../shared/components/FormElements/Input/Input";
import { InputName } from "../NewPlaces/formReducer";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import Button from "../../../shared/components/FormElements/Button/Button";
const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!identifedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id={InputName.title}
        elementProps="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={(id: InputName, value: string, isValid: boolean) => {}}
        value={identifedPlace.title}
        valid
      />
      <Input
        id={InputName.description}
        elementProps="input"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={(id: InputName, value: string, isValid: boolean) => {}}
        value={identifedPlace.description}
        valid
      />
      <Button type="submit" disabled={true}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
