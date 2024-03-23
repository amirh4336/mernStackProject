import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import "./ImageUpload.css";
import Button from "../Button/Button";
import { InputName } from "../../../hooks/form-hooks/types";

interface IImageUploadProps {
  id: InputName;
  center?: boolean;
  errorText?: string;
  onInput: (
    id: InputName,
    value: string | File | undefined,
    isValid: boolean
  ) => void;
}

const ImageUpload: FC<IImageUploadProps> = ({
  id,
  center,
  onInput,
  errorText,
}) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };
  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {typeof previewUrl === "string" ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Please pick an image.</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
