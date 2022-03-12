import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import { FormikDefaultProps } from "./common/formik-default-props";

interface FormikTextFieldProps extends FormikDefaultProps {
  type?: "text" | "password";
}

export const FormikTextField = ({
  name,
  label,
  type = "text",
}: FormikTextFieldProps) => {
  const [formikProps, formikState] = useField(name);

  // console.log(formikState)


  return (
    <TextField
      fullWidth
      margin={"normal"}
      label={label}
      type={type}
      error={Boolean(formikState.error)}
      helperText={formikState.error}
      {...formikProps}
      name={formikProps.name}
      value={formikProps.value}
    />
  );
};

export default FormikTextField;
