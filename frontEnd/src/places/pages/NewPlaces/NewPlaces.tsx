import "./NewPlaces.css"

import Input from "../../../shared/components/FormElements/Input/Input";

const NewPlaces = () => {
  return <form className="place-form">
    <Input elementProps="input" id="maybe" type="text" label="Title" />
  </form>;
};

export default NewPlaces;
