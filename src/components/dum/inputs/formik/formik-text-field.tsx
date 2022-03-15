import React from "react";
import {TextField, TextFieldProps} from "@mui/material";
import {useField} from "formik";
import {FormikDefaultProps} from "./common/formik-default-props";

interface FormikTextFieldProps extends FormikDefaultProps {
  type?: "text" | "password";
}

export function FormikTextField({
  name,
  label,
  type = "text",
  ...rest
}: FormikTextFieldProps & TextFieldProps) {
  const [formikProps, formikState] = useField(name);

  // console.log(formikState)


  return (
    <TextField
      {...rest}
      {...formikProps}
      fullWidth
      margin={"normal"}
      label={label}
      type={type}
      error={Boolean(formikState.error)}
      helperText={formikState.error}
      name={formikProps.name}
      value={formikProps.value}
    />
  );
};

export default FormikTextField;
