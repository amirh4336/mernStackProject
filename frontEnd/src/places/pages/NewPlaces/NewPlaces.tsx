import "./NewPlaces.css"

import Input from "../../../shared/components/FormElements/Input/Input";

const NewPlaces = () => {
  return <form className="place-form">
    <Input elementProps="input" id="maybe" type="text" label="Title" 
    // validators={[]}
     errorText="Please enter a valid title" />
  </form>;
};

export default NewPlaces;
