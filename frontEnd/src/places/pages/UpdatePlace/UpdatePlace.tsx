import { useNavigate, useParams } from "react-router-dom";
import "./UpdatePlace.css";
import Input from "../../../shared/components/FormElements/Input/Input";
import { EditInputs, InputName } from "../../../shared/hooks/form-hooks/types";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import Button from "../../../shared/components/FormElements/Button/Button";
import { useForm } from "../../../shared/hooks/form-hooks/form-hooks";
import { FormEvent, useEffect, useState } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
const UpdatePlace = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [identifedPlace, setIdentifedPlace] = useState<{
    title: string;
    description: string;
  }>();
  const placeId = useParams().placeId;
  const navigate = useNavigate();

  const [{ inputs, isValid }, inputHandler, setFormData] = useForm<EditInputs>(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const sendHandler = async () => {
      try {
        const resData = await sendRequest({
          url: `http://localhost:5000/api/places/${placeId}`,
        });
        setIdentifedPlace(resData.place);
        setFormData(
          {
            title: {
              value: resData.place?.title || "",
              isValid: true,
            },
            description: {
              value: resData.place?.description || "",
              isValid: true,
            },
          },
          true
        );
      } catch (err: any) {
        console.log(err);
      }
    };
    sendHandler();
  }, [sendRequest, placeId, setFormData]);

  const updatePlaceSubmitHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await sendRequest({
        url: `http://localhost:5000/api/places/${placeId}`,
        method: "PATCH",
        body: JSON.stringify({
          title: inputs.title.value,
          description: inputs.description.value,
        }),
        headers: { "Content-Type": "application/json" },
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  if (!identifedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {!isLoading && identifedPlace && (
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
      )}
    </>
  );
};

export default UpdatePlace;
