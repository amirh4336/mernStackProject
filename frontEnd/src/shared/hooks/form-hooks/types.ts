export type AddInputNames = "title" | "description" | "address";

export type EditInputNames = "title" | "description";

export type AuthInputNames = "email" | "password" | "name";

export type AddInputs = {
  [key in AddInputNames]: {
    value: string;
    isValid: boolean;
  };
};

export type EditInputs = {
  [key in EditInputNames]: {
    value: string;
    isValid: boolean;
  };
};
export type AuthInputs = {
  name?: {
    value: string;
    isValid: boolean;
  };
  image?: {
    value: File | null;
    isValid: boolean;
  };
  email: {
    value: string;
    isValid: boolean;
  };
  password: {
    value: string;
    isValid: boolean;
  };
};

export type AllInputs<T extends AddInputs | EditInputs | AuthInputs> = {
  inputs: T;
  isValid: boolean;
};

export enum InputName {
  title = "title",
  description = "description",
  address = "address",
  email = "email",
  password = "password",
  name = "name",
  image = "image",
}

export type ActionSetData<T extends AddInputs | EditInputs | AuthInputs> =
  AllInputs<T> & {
    type: "SET_DATA";
  };

export type ActionInputChange = {
  type: "INPUT_CHANGE";
  value: string | File | undefined;
  isValid: boolean;
  inputId: InputName;
};
export type IAction<T extends AddInputs | EditInputs | AuthInputs> =
  | ActionInputChange
  | ActionSetData<T>;
