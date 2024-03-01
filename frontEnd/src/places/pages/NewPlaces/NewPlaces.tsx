import "./NewPlaces.css"

import Input from "../../../shared/components/FormElements/Input/Input";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";

const NewPlaces = () => {
  return <form className="place-form">
    <Input elementProps="input" id="maybe" type="text" label="Title" 
    validators={[VALIDATOR_REQUIRE()]}
     errorText="Please enter a valid title" />
  </form>;
};

export default NewPlaces;
